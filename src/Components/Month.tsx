
import * as React from 'react';
import * as moment from 'moment';


interface Props {
  name: string;
  year : number;
}

interface State {
  rand: number;
}

class Month extends React.Component<Props, State> {
  public static defaultProps: Partial<Props> = {
    name: "January",
    year: 2018 
    };

  public state: State = {
    rand: 0,
  };

  componentDidUpdate?(){
  
    
  }
  chunk(month: any){
    let split_month = [];
    let adder = 0;
    for(let i = 0 ; i < month.length/7; i++){
      let week = [];
      week = month.slice(0 + adder,7 + adder) 
      split_month.push(week);
      adder += 7;
    }
    return split_month;
  }

  render() {
    let month_num = moment().month(this.props.name).format("M");
    let year_num = this.props.year;
    let month = [];

    for(let i = 0 ; i < 45 ; i++){
      month.push(moment(month_num + " " + year_num, "MM YYYY").day(i));
      if((month.length >= 28) 
        && (moment(month_num + " " + year_num, "MM YYYY").day(i).day() == 6)){
        break;
      }
    }
    month = this.chunk(month);

    let days_of_week = moment.weekdays();
    let daysItems = days_of_week.map(day => <th>{day}</th>);
    let listItems = month.map(week => <tr>{week.map((date :any)  => <td id="day">{date.date()}</td>)}</tr>);
    return (
      <div>
        <h1>{this.props.name + " " + this.props.year}</h1>
        <table>
          <tr>
          {daysItems}
          </tr>
            {listItems}
        </table>
      </div>
    );
  }
}

export default Month;