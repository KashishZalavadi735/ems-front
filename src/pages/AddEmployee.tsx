import AddEmployeeForm from "../components/AddEmployeeForm";

function AddEmployee() {
  return (
    <div>
        <h4 className="mt-3">Add Employee</h4>
        <p>Register a new employee</p>

        <div className="py-3">
            <AddEmployeeForm />
        </div>
    </div>
  )
}

export default AddEmployee;