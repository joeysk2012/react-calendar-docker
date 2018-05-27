import * as moment from 'moment';
import * as React from 'react';
import Month from './Month';
/*given a calnder in month view, create a week view, create a day entry  */

interface State {
  month: string;
  date: string;
  year: number;
  week : any;
  weekMode: false;
}

class Calendar extends React.Component {
    element : HTMLElement;
    public state: State = {
      date : moment().format('DD'),
      month: "January",
      year : 2018,
      week : [],
      weekMode : false
    };

    componentDidMount?(){
    
      let curComp = this;
      let prev = document.getElementById('prev')!;
      prev.onclick = function(event){ 
        let prev_month =  moment(curComp.state.month + " " + curComp.state.year  , "MMMM YYYY").subtract(1, 'months');
        let prev_month_name = moment(prev_month, 'MM').format('MMMM');
        let prev_year = prev_month.year()
        curComp.setState({month : prev_month_name, year : prev_year })
      };
      let next = document.getElementById('next')!;
      next.onclick = function(event){
        let next_month =  moment(curComp.state.month + " " + curComp.state.year  , "MMMM YYYY").add(1, 'months');
        let next_month_name = moment(next_month, 'MM').format('MMMM'); 
        let next_year = next_month.year();
        curComp.setState({month : next_month_name, year : next_year})
      };

      let day  = document.getElementById('day')!;
      day.ondblclick = function(event){
        curComp.setState{weekMode : true, week :  }
      }
 
    }
  

    public render() {
      return (
        <div>
          <div><button id = "prev">Prev</button><button id = "next">Next</button></div>
            <Month name={this.state.month} year = {this.state.year}/>
        </div>
      );
    }
  }
  
  export default Calendar;