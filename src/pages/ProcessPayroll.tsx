import ProcessPayrollForm from "../components/ProcessPayrollForm"

function ProcessPayroll() {
  return (
    <div>
        <h4 className="mt-3">Process Employee Payroll</h4>
        <p>Generate salary for an employee for a selected month</p>

        <div className="py-3">
            <ProcessPayrollForm />
        </div>
    </div>
  )
}

export default ProcessPayroll