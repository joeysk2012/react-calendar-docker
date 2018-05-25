
import * as React from 'react';
import * as moment from 'moment';


interface Props {
  days: number;
  name: string;
  year : number;
}

interface State {
  rand: number;
}

class Month extends React.Component<Props, State> {
  public static defaultProps: Partial<Props> = {
    days: 30,
    name: "",
    year: 2018 
    };

  public state: State = {
    rand: 0,
  };

  componentDidUpdate?(){
    //1. determine the first day of the month
    //2. create a week from it
    //3. determine the second week of the month and create a week from it...etc
    //4. a week should be an array of day componenets and month should be an array of weeks
    //5. map over the arrays in render creating elements.
    
  }

  render() {
    let month_num = moment().month("March").format("M")
    let year_num = 2018
    let time = moment(month_num + " " + year_num, "MM YYYY")
    let month = []
    let week = []
    let weekday_number = 0;
    let end_of_month = false;

    while(weekday_number != 6 && !end_of_month){
      let week_count = 1
      let week_map = {1 : 0, 2 : 7, 3 : 14, 4 : 21, 5: 28, 6 : 35} 
      for(let i = week_map[week_count] ; i < (7 * week_count) ; i++ ){
        time = moment(month_num + " " + year_num, "MM, YYYY").day(i)
        week.push(time)
      }
      month.push(week)
      console.log(month)
      //if you have reached the end of the month and the weekday number is 6 then stop.
      weekday_number = week[6].weekday();
      if(week[6].date() == time.endOf('month').date()){
        end_of_month = true;
      }
    }

    let listItems = month.map(week => <tr>{week.map(day => <td>{day}</td>)}</tr>)
    let days_of_week = moment.weekdays()
    let daysItems = days_of_week.map(day => <th>{day}</th>)
    return (
      <table>
      <tr>
      {daysItems}
      </tr>
        {listItems}
      </table>
    );
  }
}

export default Month;