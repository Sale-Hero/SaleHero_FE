import style from "../../assets/scss/sub/modal.module.scss";

interface Args{
    modalClose: (_: any) => void
}
export function ConfirmModal({modalClose}:Args) {

    const handleModalClose = () =>{
        modalClose((prev: boolean) => !prev);
        window.location.href = '/'
    }
    return(
        <>
            <div className={style.confirmBackdrop}>
                <div className={style.modalWrapper}>
                    <div className={style.textArea}>
                        <span className={style.title}>가입 안내</span>
                        <span className={style.description}>회원 가입을 성공했습니다.<br/>이메일을 확인해주세요.</span>
                    </div>

                    <div className={style.buttonArea}>
                        <button className={style.confirm}
                                onClick={handleModalClose}
                        >확인</button>
                    </div>
                </div>
            </div>
        </>
    )
}