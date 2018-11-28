import {combineReducers} from 'redux';
import {SearchReducer as search} from '../routes/Search/modules/Search';
import {FindReducer as find} from '../routes/Find/modules/Find';
import {ProfileReducer as profile} from '../routes/Profile/modules/Profile';
import {SettingsReducer as settings} from '../routes/Settings/modules/Settings';
import {NotificationReducer as notification} from '../routes/Notification/modules/Notification';
import {TransactionReducer as transaction} from '../routes/Transaction/modules/Transaction';
import {TrackHandyman as track} from '../routes/TrackHandyman/modules/TrackHandyman';
import {FeedbackReducer as feedback} from '../routes/Feedback/modules/Feedback';
import {BookingFormReducer as bookingform} from '../routes/BookingForm/modules/BookingForm';

export const makeRootReducer = () => {
    return combineReducers({
        search,
        find,
        profile,
        settings,
        notification,
        transaction,
        track,
        feedback,
        bookingform
    });
}

export default makeRootReducer;