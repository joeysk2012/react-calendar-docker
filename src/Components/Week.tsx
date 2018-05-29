
import * as React from 'react';
import * as moment from 'moment';
import './Week.css';


interface Props {
  days: any;
  entries: object[];
  onEventChange: any;
}

interface State {
  addMode: boolean;
  addDate: any;
  addText: string;
}


class Week extends React.Component<Props, State> {
  public static defaultProps: Partial<Props> = {
        days: []
    };

  public state: State = {
    addMode: false,
    addDate: "",
    addText: ""
  };

  componentDidMount?(){
    this.showEntries(this.props.entries)
  }

  showEntries(entries: any){
    entries = this.props.entries;
    let days = this.props.days;

    //clear out current entries so you don't double add
    for(let i = 0 ; i < 7 ; i++){
      let curr = document.getElementById(i.toString()).innerHTML.slice(0,2);
      document.getElementById(i.toString()).innerHTML = curr
    }
      
      for(let i = 0 ; i < 7 ; i++){
          for(let j = 0 ; j < entries.length ; j++){
            if(days[i].date() === entries[j][0].date() && days[i].month() === entries[j][0].month()){
              let curr = document.getElementById(i.toString()).innerHTML;
              document.getElementById(i.toString()).innerHTML = curr + " \n " +entries[j][1];
              document.getElementById(i.toString()).className = "flag-week";
            }
          }
          
            

      }
  }

  handleAdd(day :any){
  //I can see it doing two ways, just writing it here and set stating, or making a new component, Entry, and then pushing state back up to calendar
    this.setState({addMode : true, addDate : day})
  }

  handleChange(e :any){
    console.log(e.target.value)
    e.preventDefault()
    this.setState({addText : e.target.value})
  }

  handleEventChange(e :any){
    e.preventDefault()
    this.props.onEventChange(this.state.addDate, this.state.addText)
    this.showEntries(this.props.entries)
  }


  render() {
    let weekday = moment.weekdays();
    let tableHeaders = weekday.map((day: any, index: number) => <th key={index}>{day}</th>)
    let days = this.props.days
    let tableItems = days.map((day: any, index: number, onDoubleClick: any) => <td key={index} id={index.toString()} onDoubleClick = {() => this.handleAdd(day)}>{day.date()}</td>)
    let formItem;
    this.state.addMode ?       
    formItem = 
    <form>
      <div id= "event-date">Adding Event for:   {this.state.addDate.format("MM-DD-YYYY")}</div>
      <label>
        Event Description:
        <input id="event-text" type="text" name="event" onChange = {(e) => this.handleChange(e)} />
      </label>
      <input id="event-submit" type="submit" value="Submit" onClick={(e) => this.handleEventChange(e)}/>
    </form> :
    <form></form>

    return (
      <div>
      {formItem}
      <p>Double click a date to add an event</p>
        <table>
            <thead>
              <tr>{tableHeaders}</tr>
            </thead>
            <tbody>
              <tr>{tableItems}</tr>
            </tbody>
        </table>
      </div>
    );
  }
}

export default Week;