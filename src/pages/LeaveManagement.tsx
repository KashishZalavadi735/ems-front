import ManageLeaves from "../components/ManageLeaves";

function LeaveManagement() {
  return (
    <div>
      <div className="mt-3">
        <h4>Leaves Management</h4>
        <small>Manage Employees's Leaves here.</small>
      </div>

      <div className="py-3">
        <ManageLeaves />
      </div>
    </div>
  );
}

export default LeaveManagement;
