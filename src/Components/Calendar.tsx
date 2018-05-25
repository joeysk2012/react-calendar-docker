import * as moment from 'moment';
import * as React from 'react';
import Month from './Month';
/*given a calnder in month view, create a week view, create a day entry  */

interface State {
  month: string;
  date: string;
}

class Calendar extends React.Component {

    public state: State = {
      date : moment().format('DD'),
      month: "January",
    };
  

    public render() {
      return (
        <div>
            <Month days={30} name="January" year = {2018}/>
        </div>
      );
    }
  }
  
  export default Calendar;