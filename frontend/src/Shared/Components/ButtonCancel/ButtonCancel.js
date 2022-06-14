import { Button } from "reactstrap"

export const ButtonCancel = (props) => {
    const { funcCallBack } = props;

    return(
        <>
            <Button color="danger"
                    className="mb-15 fontsz-18"
                    onClick={() => funcCallBack()}
            >
                <i className="fa fa-ban fontsz-20" aria-hidden="true"></i>{" "}
                Huỷ bỏ
            </Button>
        </>
    )
}