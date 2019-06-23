import * as React from "react";
import { Employee } from "../mst";
import { observer, inject } from "mobx-react";

interface EmployeeComponentProps {
  employee: Employee;
}

interface EmployeeComponentState {
  employeeName: string;
  hours_worked: string;
  edit: boolean;
}

@inject("rootTree")
@observer
class EmployeeComponent extends React.Component<
  EmployeeComponentProps,
  EmployeeComponentState
> {
  constructor(props: EmployeeComponentProps) {
    super(props);

    this.state = {
      employeeName: this.props.employee.name,
      hours_worked: `${this.props.employee.hours_worked}`,
      edit: false
    };
    this.changeEmployeeName = this.changeEmployeeName.bind(this);
    this.changeHoursWorked = this.changeHoursWorked.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  changeEmployeeName(e: any) {
    const employeeName = e.target.value;
    this.setState({ employeeName });
  }

  changeHoursWorked(e: any) {
    const hours_worked = e.target.value;
    this.setState({ hours_worked });
  }

  toggleEdit() {
    this.setState(prev => ({ edit: !prev.edit }));
  }

  onSubmit(e: any) {
    e.preventDefault();

    const { employeeName, hours_worked } = this.state;
    this.props.employee.editEmployee(employeeName, parseInt(hours_worked));
    this.toggleEdit();
  }

  render() {
    const { hours_worked, name } = this.props.employee;
    const { edit } = this.state;
    return (
      <div>
        {edit ? (
          <form onSubmit={this.onSubmit}>
            <input
              value={this.state.employeeName}
              onChange={this.changeEmployeeName}
            />
            <input
              value={this.state.hours_worked}
              onChange={this.changeHoursWorked}
            />
            <button type="submit">submit</button>
            <button type="button" onClick={this.toggleEdit}>
              cancel
            </button>
          </form>
        ) : (
          <>
            <p>{`Name: ${name}`}</p>
            <p>{`hours worked: ${hours_worked}`}</p>
            <button onClick={this.toggleEdit}>Edit</button>
          </>
        )}
      </div>
    );
  }
}

export { EmployeeComponent };
