import { __ } from '@wordpress/i18n';

// PART : Screen reader text format
// ( function( wp ) {
// 	// Custom button for the editor toolbar
// 	let customButton = function( props ) {
// 		return wp.element.createElement(
// 			wp.editor.RichTextToolbarButton, {
// 				icon    : 'tablet',
// 				title   : __( 'Screen Reader Text' ),
// 				isActive: props.isActive,
// 				onClick : function() {
// 					console.log( 'Custom Button Clicked!' );
// 					props.onChange( wp.richText.toggleFormat(
// 						props.value,
// 						{ type: 'lag/format-screen-reader-text' }
// 					) );
// 				}
// 			}
// 		)
// 	}
	
// 	// Register the screen reader format type used with the custom button on richText component
// 	wp.richText.registerFormatType( 'lag/format-screen-reader-text', {
// 		title    : __( 'Screen Reader Text' ),
// 		tagName  : 'span',
// 		className: 'screen-reader-text',
// 		edit     : customButton
// 	} )
// } )( window.wp )



import './index.scss';

import {  BlockControls } from '@wordpress/block-editor';
import { TextControl, Button, Popover, ToolbarGroup, ToolbarButton } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { applyFormat, removeFormat, useAnchorRef } from '@wordpress/rich-text';
import { ENTER } from '@wordpress/keycodes';

const LangAttributeButton = ( props ) => {
	const { contentRef, isActive, onChange, value } = props;
	const anchorRef = useAnchorRef( { ref: contentRef, value } );
	
	const [ lang, setLang ] = useState( '' );
	const [ isPopoverVisible, setIsPopoverVisible ] = useState( false );
	const togglePopover = () => {
		setIsPopoverVisible( ( state ) => ! state );
		setLang( '' )
	};

	return (
		<>
			<BlockControls>
				<ToolbarGroup>
					<ToolbarButton
						icon="translation"
						label={ __( 'Lang attribute', 'lang-attribute-for-gutenberg' ) }
						onClick={ () => {
							if ( isActive ) {
								onChange( removeFormat( value, 'lag/format-lang-attribute' ) );
							} else {
								togglePopover()
							}
						} }
						isActive={ isActive }
					/>
				</ToolbarGroup>
			</BlockControls>

			{ isPopoverVisible && (
				<Popover
					className="components-lang-attribute-popover"
					anchor={ anchorRef }
					position="bottom center"
				>
					<TextControl
						label={ __( 'Lang attribute', 'lang-attribute-for-gutenberg' ) }
						value={ lang }
						onChange={ lang => setLang( lang ) }
						// TODO : To be the same as the onclick on button, but not working there
						// onKeyDown={ ( event ) => {
						// 	const { keyCode } = event;

						// 	if ( keyCode === ENTER ) {
						// 		console.log('ENTER')
						// 		// applyFormatWithLang()
						// 		onChange(
						// 			applyFormat( value, {
						// 				type: 'lag/format-lang-attribute',
						// 				attributes: {
						// 					lang: lang
						// 				}
						// 			} )
						// 		)
						// 		togglePopover()
						// 	}
						// } }
					/>
					<Button
						isPrimary
						text={ __( 'Apply', 'lang-attribute-for-gutenberg' ) }
						onClick={ () => {
							onChange(
								applyFormat( value, {
									type: 'lag/format-lang-attribute',
									attributes: {
										lang: lang
									}
								} )
							)
							togglePopover()
						} }
					/>
				</Popover>
			) }
		</>
	)
};
		
// Register the Format.
wp.richText.registerFormatType( 'lag/format-lang-attribute', {
	className: 'lang-attribute',
	edit     : LangAttributeButton,
	tagName  : 'span',
	icon     : 'translation',
	title    : __( 'Lang attribute', 'lang-attribute-for-gutenberg' ),
} );