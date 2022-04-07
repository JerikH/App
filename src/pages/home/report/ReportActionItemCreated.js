import React from 'react';
import {View} from 'react-native';
import {withOnyx} from 'react-native-onyx';
import PropTypes from 'prop-types';
import ONYXKEYS from '../../../ONYXKEYS';
import RoomHeaderAvatars from '../../../components/RoomHeaderAvatars';
import ReportWelcomeText from '../../../components/ReportWelcomeText';
import participantPropTypes from '../../../components/participantPropTypes';
import * as ReportUtils from '../../../libs/reportUtils';
import styles from '../../../styles/styles';
import * as OptionsListUtils from '../../../libs/OptionsListUtils';

const propTypes = {
    /** The report currently being looked at */
    report: PropTypes.shape({
        /**  Avatars corresponding to a chat */
        icons: PropTypes.arrayOf(PropTypes.string),

        /** Whether the user is not an admin of policyExpenseChat chat */
        isOwnPolicyExpenseChat: PropTypes.bool,

    }),

    /** Personal details of all the users */
    personalDetails: PropTypes.objectOf(participantPropTypes),
};
const defaultProps = {
    report: {},
    personalDetails: {},
};

const ReportActionItemCreated = (props) => {
    const isPolicyExpenseChat = ReportUtils.isPolicyExpenseChat(props.report);
    const avatarIcons = OptionsListUtils.getReportIcons(props.report, props.personalDetails);
    return (
        <View style={[
            styles.chatContent,
            styles.pb8,
            styles.p5,
        ]}
        >
            <View style={[styles.justifyContentCenter, styles.alignItemsCenter, styles.flex1]}>
                <RoomHeaderAvatars
                    avatarIcons={avatarIcons}
                    shouldShowLargeAvatars={isPolicyExpenseChat}
                />
                <ReportWelcomeText report={props.report} />
            </View>
        </View>
    );
};

ReportActionItemCreated.defaultProps = defaultProps;
ReportActionItemCreated.propTypes = propTypes;
ReportActionItemCreated.displayName = 'ReportActionItemCreated';

export default withOnyx({
    report: {
        key: ({reportID}) => `${ONYXKEYS.COLLECTION.REPORT}${reportID}`,
    },
    personalDetails: {
        key: ONYXKEYS.PERSONAL_DETAILS,
    },
})(ReportActionItemCreated);
