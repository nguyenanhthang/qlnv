
import { Button } from "reactstrap"

export const ButtonAdd = (props) => {
    const { funcCallBack } = props;

    return(
        <>
            <Button 
                    className="mb-15 fontsz-18"
                    onClick={() => funcCallBack()}
            >
                <i className="fa fa-check-circle fontsz-20" aria-hidden="true"></i>{" "}
                Tạo mới
            </Button>
        </>
    )
}