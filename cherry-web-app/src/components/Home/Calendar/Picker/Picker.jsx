import 'rc-calendar/assets/index.css';
import React from 'react';

import Calendar from 'rc-calendar';
import DatePicker from 'rc-calendar/lib/Picker';

import zhCN from 'rc-calendar/lib/locale/zh_CN';
import enUS from 'rc-calendar/lib/locale/en_US';
import bgBG from 'rc-calendar/lib/locale/bg_BG';

import 'rc-time-picker/assets/index.css';
import TimePickerPanel from 'rc-time-picker/lib/Panel';

import moment from 'moment';
import 'moment/locale/zh-cn';
import 'moment/locale/en-gb';
import 'moment/locale/bg';

const format = 'DD.MM.YYYY HH:mm:ss';
const cn = window.location.search.indexOf('cn') !== -1;

const now = moment();

// if (cn) {
//   now.locale('zh-cn').utcOffset(8);
// } else {
//   now.locale('en-gb').utcOffset(0);
// }
now.locale('bg').utcOffset(2);

export function getFormat(time) {
  return time ? format : 'DD.MM.YYYY';
}

const defaultCalendarValue = now.clone();
defaultCalendarValue.add(-1, 'month');

const timePickerElement = <TimePickerPanel />;

const SHOW_TIME = true;

class Picker extends React.Component {
  state = {
    showTime: SHOW_TIME,
    disabled: false,
  };

  render() {
    const props = this.props;
    const calendar = (<Calendar
      // locale={cn ? zhCN : enUS}
      locale={bgBG}
      defaultValue={now}
      timePicker={props.showTime ? timePickerElement : null}
      disabledDate={props.disabledDate}
    />);
    return (<DatePicker
      animation="slide-up"
      disabled={props.disabled}
      calendar={calendar}
      value={props.value}
      onChange={props.onChange}
    >
      {
        ({ value }) => {
          return (
            <span>
              <input
                placeholder="Моля изберете дата"
                style={{ width: 50 }}
                disabled={props.disabled}
                readOnly
                value={value && value.format(getFormat(props.showTime)) || ''}
              />
            </span>
          );
        }
      }
    </DatePicker>);
  }
}

export default Picker;