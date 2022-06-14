import { Table } from "reactstrap";
import { TableLoading } from "../Loading/Loading";
/**
* @param {Array} headers 
* @param {Array} body
* @param {boolean} isLoading
*/
export const DataTable = (props) => {
    const { headers, body, isLoading } = props;

    return (
        <Table hover striped bordered className="table-head-fixed">
            <thead className="middle">
                <tr>
                    {headers.map((h,i) => (<th key={i}>{h}</th>))}
                </tr>
            </thead>
            <tbody className="bodyTable">
                {!isLoading ? body.map(el => (
                    <tr key={el.id}>
                        {Object.values(el).map((v,i) => <td key={i}>{v}</td>)}
                    </tr>
                )) : <TableLoading length={headers.length}/>}
            </tbody>
        </Table>
    )
}