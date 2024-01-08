import PropTypes from 'prop-types';
import React from 'react';
import useTheme from '@hooks/useTheme';
import useThemeStyles from '@hooks/useThemeStyles';
import HeaderPageLayout from './HeaderPageLayout';
import headerWithBackButtonPropTypes from './HeaderWithBackButton/headerWithBackButtonPropTypes';
import Lottie from './Lottie';

const propTypes = {
    ...headerWithBackButtonPropTypes,

    /** Children to display in the lower half of the page (below the header section w/ an animation) */
    children: PropTypes.node.isRequired,

    /** The illustration to display in the header. Can be either an SVG component or a JSON object representing a Lottie animation. */
    illustration: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,

    /** The background color to apply in the upper half of the screen. */
    backgroundColor: PropTypes.string,

    /** A fixed footer to display at the bottom of the page. */
    footer: PropTypes.node,

    /** Overlay content to display on top of animation */
    overlayContent: PropTypes.func,

    isCentralPane: PropTypes.bool,
};

const defaultProps = {
    backgroundColor: undefined,
    footer: null,
    overlayContent: null,
    isCentralPane: false,
};

function IllustratedHeaderPageLayout({backgroundColor, children, illustration, footer, overlayContent, isCentralPane, ...propsToPassToHeader}) {
    const theme = useTheme();
    const styles = useThemeStyles();
    const shouldLimitHeight = !propsToPassToHeader.shouldShowBackButton;

    return (
        <HeaderPageLayout
            backgroundColor={backgroundColor || theme.appBG}
            title={propsToPassToHeader.title}
            isCentralPane={isCentralPane}
            headerContent={
                <>
                    <Lottie
                        source={illustration}
                        style={styles.w100}
                        webStyle={shouldLimitHeight ? styles.h100 : styles.w100}
                        autoPlay
                        loop
                    />
                    {overlayContent && overlayContent()}
                </>
            }
            // TODO: move to variables
            headerContainerStyles={[styles.justifyContentCenter, styles.w100, shouldLimitHeight && styles.centralPaneAnimation]}
            footer={footer}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...propsToPassToHeader}
        >
            {children}
        </HeaderPageLayout>
    );
}

IllustratedHeaderPageLayout.propTypes = propTypes;
IllustratedHeaderPageLayout.defaultProps = defaultProps;
IllustratedHeaderPageLayout.displayName = 'IllustratedHeaderPageLayout';

export default IllustratedHeaderPageLayout;
