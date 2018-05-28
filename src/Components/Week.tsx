
import * as React from 'react';
import * as moment from 'moment';


interface Props {
  days: any;
  entries: object[];
  onEventChange: any;
}

interface State {
  addMode: boolean,
  addDate: any;
}


class Week extends React.Component<Props, State> {
  public static defaultProps: Partial<Props> = {
        days: []
    };

  public state: State = {
    addMode: false,
    addDate: ""
  };

  componentDidMount?(){
    this.showEntries(this.props.entries)
  }

  componentDidUpdate?(){
    this.showEntries(this.props.entries)
  }

  showEntries(entries: any){
    entries = this.props.entries;
    let days = this.props.days;
  
      for(let i = 0 ; i < 7 ; i++){
        let count = 0;
          for(let j = 0 ; j < entries.length ; j++){
            if(days[i].date() === entries[j][0].date() && days[i].month() === entries[j][0].month()){
              count += 1
            }
          }
          if(count > 0){
            let curr = document.getElementById(i.toString()).innerHTML;
            document.getElementById(i.toString()).innerHTML = curr + " e: " + count;
            document.getElementById(i.toString()).className = "flag";
          }
      }
  }

  handleAdd(day :any){
  //I can see it doing two ways, just writing it here and set stating, or making a new component, Entry, and then pushing state back up to calendar
    this.setState({addMode : true, addDate : day})
  }

  handleAddSubmit(){
    let val = document.getElementById("event").innerHTML
    this.props.onEventChange(this.state.addDate, val)
  }


  render() {
    let weekday = moment.weekdays();
    let tableHeaders = weekday.map((day: any, index: number) => <th key={index}>{day}</th>)
    let days = this.props.days
    console.log(days)
    let tableItems = days.map((day: any, index: number, onDoubleClick: any) => <td key={index} id={index.toString()} onDoubleClick = {() => this.handleAdd(day)}>{day.date()}</td>)
    let formItem;
    this.state.addMode ?       
    formItem = 
    <form>
    <div id= "event-date">Adding Event for:   {this.state.addDate.format("MM-DD-YYYY")}</div>
    <label>
    Event Description:
    <input id="event" type="text" name="event" />
    </label>
    <input id="event-submit" type="submit" value="Submit" onClick={this.handleAddSubmit.bind(this)}/>
    </form> :
    <div></div>

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