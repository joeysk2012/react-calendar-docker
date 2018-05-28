
import * as React from 'react';
import * as moment from 'moment';


interface Props {
  name: string;
  year : number;
  onWeekChange : Function;
  entries : object[]
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

  componentDidMount?(){
    this.showEntries(this.props.entries)
  }

  componentDidUpdate?(){
    this.showEntries(this.props.entries)
  }
  
  /* compare all entries with all days of the month, if they are equal then add a count of notes to it */
  showEntries(entries: object[]){
    entries = this.props.entries;
  
      for(let i = 0 ; i < 35 ; i++){
        if(!document.getElementById(i.toString())){
          break;
        }
        let count = 0;
        for(let j = 0 ; j < entries.length ; j++){
          if(entries[j][0].date().toString() === document.getElementById(i.toString()).innerHTML.slice(0,2) && this.props.name === entries[j][0].format('MMMM')){
            count += 1
          }
        }
        if(count > 0){
          let curr = document.getElementById(i.toString()).innerHTML
          document.getElementById(i.toString()).innerHTML = curr + " e: " + count
          document.getElementById(i.toString()).className = "flag"
        }
      }
  }

  handleWeekView(week: object[]){
    this.props.onWeekChange(week);
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
    let daysItems = days_of_week.map((day,index) => <th key={index}>{day}</th>);
    let ids = 0;
    let listItems = month.map((week :object[], index :number, onDoubleClick :any) => 
      <tr key={index} onDoubleClick = {() => this.handleWeekView(week)}>
        {week.map((date :any, index :number)  => 
          <td key= {index} id={(ids++).toString()}>
            {date.date()}
          </td>)}
      </tr>);
    
    return (
      <div>
        <h1>{this.props.name + " " + this.props.year}</h1>
        <table id="month">
          <thead>
            <tr>
              {daysItems}
            </tr>
          </thead>
          <tbody>
            {listItems}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Month;