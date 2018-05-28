import * as moment from 'moment';
import * as React from 'react';
import Month from './Month';
import Week from './Week';
/*given a calnder in month view, create a week view, create a day entry  */

interface State {
  month: string;
  date: string;
  year: number;
  week : any;
  weekMode: boolean;
  items: object[];
}

class Calendar extends React.Component {
    
    public state: State = {
      date : moment().format('DD'),
      month: "January",
      year : 2018,
      week : [],
      weekMode : false,
      items: [[moment("01-12-2018", "MM-DD-YYYY"), "Meeting 1 3pm"]]
    };


    private handleWeekChange(week : object[]){
        this.setState({weekMode : true, week : week})
    }

    handleBack(){
      this.setState({weekMode : false})
    }

    handleNext(){
      let next_month =  moment(this.state.month + " " + this.state.year  , "MMMM YYYY").add(1, 'months');
        let next_month_name = moment(next_month, 'MM').format('MMMM'); 
        let next_year = next_month.year();
        this.setState({month : next_month_name, year : next_year})
    }

    handlePrev(){
      let prev_month =  moment(this.state.month + " " + this.state.year  , "MMMM YYYY").subtract(1, 'months');
      let prev_month_name = moment(prev_month, 'MM').format('MMMM');
      let prev_year = prev_month.year()
      this.setState({month : prev_month_name, year : prev_year })
    }

    componentDidMount?(){

    }
  
    public render() {
      let component = this.state.weekMode == false ? 
        <Month name={this.state.month} year = {this.state.year} onWeekChange = {this.handleWeekChange.bind(this)} items = {this.state.items} /> : <Week days = {this.state.week} />
      let buttons = this.state.weekMode == false ?
        <div><button id = "prev" onClick = {this.handlePrev.bind(this)}>Prev</button><button id = "next" onClick = {this.handleNext.bind(this)} >Next</button></div> : <button id="back" onClick = {this.handleBack.bind(this)}>Month View</button>
      return (
        <div>
          {buttons}
          {component}
        </div>
          

      );
    }
  }
  
  export default Calendar;