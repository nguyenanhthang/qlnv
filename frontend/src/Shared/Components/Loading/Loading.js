import { Progress } from "reactstrap";

export const TableLoading = (props) => {
    const { length } = props;
    return (
        <tr>
            {[...Array(length)].map((_, index) => (
                <td key={index}><Progress animated color="success" value="100" style={{height : "30px"}}>Loading.... </Progress></td>
            ))}
        </tr>
    )
}