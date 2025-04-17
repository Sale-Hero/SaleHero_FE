import style from "../../assets/scss/sub/modal.module.scss"
import {CompanyInformationDTO} from "../../types/companyInformation";
import closeBtn from "../../assets/img/close_btn.svg"
interface Args{
    companyInformation: CompanyInformationDTO
    setRevealModal: (_: CompanyInformationDTO) => void
}
export function Modal({companyInformation, setRevealModal}:Args) {

    console.log(companyInformation)

    const handleModalClose = () =>{
        setRevealModal({} as CompanyInformationDTO)
    }

    // @ts-ignore
    const JobDetail = ({ label, value }) => (
        <div className={style.jobContent}>
            <span className={style.contentsName}>{label}</span>
            <span className={style.contentText}>{value}</span>
        </div>
    );
    return (
        <>
            <div className={style.backdrop}>
                <div className={style.modalWrapper}>
                    <div className={style.modal}>
                        <div className={style.headerArea}>
                            <img className={style.closeBtn} src={closeBtn} alt={'close'}
                                 onClick={handleModalClose}/>
                        </div>

                        <div className={style.titleArea}>
                            <span className={style.titleText}>
                                {companyInformation.companyName}
                            </span>
                        </div>

                        <div className={style.bodyArea}>
                            <JobDetail label="Position" value={companyInformation.companyResponsibilities}/>
                            <JobDetail label="Location" value={companyInformation.companyLocation}/>
                            <JobDetail label="Salaries" value={companyInformation.companySalaryRange}/>
                            <JobDetail label="Descriptions" value={companyInformation.companyDescription}/>
                        </div>

                        <div className={style.footerArea}>
                            <div className={style.buttonWrapper}>
                                <button className={style.applyButton}>
                                    <span className={style.buttonText}>
                                         Applying for this Job
                                    </span>
                                </button>

                                <button className={style.closeButton}
                                        onClick={handleModalClose}>
                                    <span className={style.buttonText}>
                                         Close
                                    </span>
                                </button>
                            </div>

                        </div>

                    </div>

                </div>
            </div>
        </>
    );
}