
import * as React from 'react';
import * as moment from 'moment';


interface Props {
  days: object[];
}


class Week extends React.Component<Props> {
  public static defaultProps: Partial<Props> = {
        days: []
    };

  componentDidUpdate?(){
  
    
  }

  render() {
    let weekday = moment.weekdays();
    let tableHeaders = weekday.map((day: any, index: number) => <th>{day}</th>)
    let days = this.props.days
    console.log(days)
    let tableItems = days.map((day: any, index: number) => <td key={index}>{day.date()}</td>)
    return (
        <table>
            <tr>{tableHeaders}</tr>
            <tr>{tableItems}</tr>
        </table>
    );
  }
}

export default Week;