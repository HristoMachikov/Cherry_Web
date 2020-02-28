// /* eslint react/no-multi-comp:0, no-console:0 */

// import 'rc-calendar/assets/index.css';
import React, { Fragment } from 'react';
import Picker  from './Picker/Picker';
import * as FromPicker from './Picker/Picker';

// import Calendar from 'rc-calendar';
// import DatePicker from 'rc-calendar/lib/Picker';

// import zhCN from 'rc-calendar/lib/locale/zh_CN';
// import enUS from 'rc-calendar/lib/locale/en_US';
// import bgBG from 'rc-calendar/lib/locale/bg_BG';

// import 'rc-time-picker/assets/index.css';
// import TimePickerPanel from 'rc-time-picker/lib/Panel';

// import moment from 'moment';
// import 'moment/locale/zh-cn';
// import 'moment/locale/en-gb';
// import 'moment/locale/bg';

// const format = 'DD.MM.YYYY HH:mm:ss';
// const cn = window.location.search.indexOf('cn') !== -1;

// const now = moment();
// // if (cn) {
// //   now.locale('zh-cn').utcOffset(8);
// // } else {
// //   now.locale('en-gb').utcOffset(0);
// // }
// now.locale('bg').utcOffset(2);

// function getFormat(time) {
//   return time ? format : 'DD.MM.YYYY';
// }


// const defaultCalendarValue = now.clone();
// defaultCalendarValue.add(-1, 'month');

// const timePickerElement = <TimePickerPanel />;


// const SHOW_TIME = true;

// // -----------------------------
// class Picker extends React.Component {
//   state = {
//     showTime: SHOW_TIME,
//     disabled: false,
//   };

//   render() {
//     const props = this.props;
//     const calendar = (<Calendar
//       // locale={cn ? zhCN : enUS}
//       locale={bgBG}
//       defaultValue={now}
//       timePicker={props.showTime ? timePickerElement : null}
//       disabledDate={props.disabledDate}
//     />);
//     return (<DatePicker
//       animation="slide-up"
//       disabled={props.disabled}
//       calendar={calendar}
//       value={props.value}
//       onChange={props.onChange}
//     >
//       {
//         ({ value }) => {
//           return (
//             <span>
//               <input
//                 placeholder="Моля изберете дата"
//                 style={{ width: 25 }}
//                 disabled={props.disabled}
//                 readOnly
//                 value={value && value.format(getFormat(props.showTime)) || ''}
//               />
//             </span>
//           );
//         }
//       }
//     </DatePicker>);
//   }
// }
// // -----------------------------

const SHOW_TIME = true;
class Demo extends React.Component {
  state = {
    startValue: null,
    endValue: null,
  };

  onChange = (field, value) => {
    console.log('onChange', field, value && value.format(FromPicker.getFormat(SHOW_TIME)));
    // console.log(value.toDate())
    // console.log(FromPicker.defaultCalendarValue.toDate())
    this.setState({
      [field]: value,
    });
    
  }

  disabledEndDate = (endValue) => {
    if (!endValue) {
      return false;
    }
    const startValue = this.state.startValue;
    if (!startValue) {
      return false;
    }
    return SHOW_TIME ? endValue.isBefore(startValue) :
      endValue.diff(startValue, 'days') <= 0;
  }

  disabledStartDate = (startValue) => {
    if (!startValue) {
      return false;
    }
    const endValue = this.state.endValue;
    if (!endValue) {
      return false;
    }
    return SHOW_TIME ? endValue.isBefore(startValue) :
      endValue.diff(startValue, 'days') <= 0;
  }

  render() {
    const state = this.state;
    console.log(this.state.startValue && this.state.startValue.toDate())
    console.log(this.state.endValue && this.state.endValue.toDate())
    return (
      <div 
      style={{ width: 250, margin: 20 }}
      >
        <p>
          От дата:
          <Picker
            disabledDate={this.disabledStartDate}
            value={state.startValue}
            onChange={this.onChange.bind(this, 'startValue')}
          />
        </p>

        <p>
          До дата:
          <Picker
            disabledDate={this.disabledEndDate}
            value={state.endValue}
            onChange={this.onChange.bind(this, 'endValue')}
          />
        </p>
      </div>);
  }
}

export default Demo;