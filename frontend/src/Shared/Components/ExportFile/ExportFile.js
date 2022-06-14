import { Button } from "reactstrap";

export const ExportFile = (props) => {
    const handleExportExcel = () => {
        window.location.assign(props.url);
    }

    return (
        <Button className="fontsz-18"
            onClick={() => { handleExportExcel() }}
        >
            <i className="fa fa-file-excel-o" aria-hidden="true"></i> Excel 
        </Button>
    )
}