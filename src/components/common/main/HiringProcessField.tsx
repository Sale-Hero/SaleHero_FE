import style from "../../../assets/scss/common/main.module.scss";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

interface ProcessStep {
    title: string;
    description: string;
    stats: {
        successRate?: string;
        avgProcessTime?: string;
        requirements?: string[];
    };
}

export function HiringProcessField() {
    const navigate = useNavigate();
    const [isDetailHovered, setIsDetailHovered] = useState(false);
    const [isEtaHovered, setIsEtaHovered] = useState(false);

    const hiringProcessInformation: ProcessStep[] = [
        {
            title: '1. 비자 신청 방법',
            description: '비자를 신청하는 방법은 다음과 같습니다.',
            stats: {
                successRate: '95%',
                avgProcessTime: '2-3 weeks',
                requirements: ['Valid passport', 'Application form', 'Supporting documents']
            }
        },
        {
            title: '2. 인터뷰 과정',
            description: '북미 시장에서는 인터뷰 절차를 여러 단계 준비하는것이 중요합니다. 이를테면 기술인텨뷰 같은 경우에는 단순한 프로젝트에 대한 내용 보다는...',
            stats: {
                successRate: '80%',
                avgProcessTime: '1-2 weeks',
                requirements: ['기술 면접 준비', '영어 커뮤니케이션', '포트폴리오']
            }
        },
        {
            title: '3. 효과적인 영어 학습',
            description: '의사소통을 하는 과정에서 순조로운 영어 회화 실력은 필수입니다. 회화나 영어 실력 향상을 위한 학습 방법은 다양하게 있는데요.',
            stats: {
                successRate: '85%',
                avgProcessTime: '3-6 months',
                requirements: ['일상 회화', '비즈니스 영어', '이메일 작성']
            }
        },
        {
            title: '4. 한인 네트워킹 형성',
            description: '해외에서 한인들의 커뮤니티를 통해 다양한 정보들과 지역에 대한 최신 정보들을 여러 방면으로 얻을 수 있기 때문에, 네트워킹을 형성하는것은 매우 중요합니다.',
            stats: {
                successRate: '90%',
                avgProcessTime: '1-2 months',
                requirements: ['현지 커뮤니티 참여', '네트워킹 이벤트 참석', '온라인 그룹 활동']
            }
        }
    ];

    const onClickMovePage = (value: string) => {
        value === 'eta' 
            ? window.location.href = 'https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada/eta/apply-ko.html'
            : navigate('/hiring-detail');
    }

    return (
        <>
            <div className={style.hiringTitleWrapper}>
                <span className={style.text}>북미 취업 과정</span>
            </div>
            <div className={style.hiringProcessWrapper}>
                <div className={style.hiringProcessBodyWrapper}>
                    {hiringProcessInformation.map((step, idx) => (
                        <div className={style.hiringProcessBody} key={idx}>
                            <div className={style.hiringProcessContents}>
                                <div className={style.stepHeader}>
                                    <span className={style.text}>{step.title}</span>
                                    <div className={style.stats}>
                                        {step.stats.successRate && (
                                            <div className={style.stat}>
                                                <span className={style.label}>성공률</span>
                                                <span className={style.value}>{step.stats.successRate}</span>
                                            </div>
                                        )}
                                        {step.stats.avgProcessTime && (
                                            <div className={style.stat}>
                                                <span className={style.label}>소요 기간</span>
                                                <span className={style.value}>{step.stats.avgProcessTime}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <span className={style.subText}>{step.description}</span>
                                {step.stats.requirements && (
                                    <div className={style.requirements}>
                                        <span className={style.requirementsTitle}>필수 요건:</span>
                                        <ul>
                                            {step.stats.requirements.map((req, index) => (
                                                <li key={index}>{req}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                <div className={style.hiringSupportButtonWrapper}>
                    <button
                        type="button"
                        className={`${style.detailButtonWrapper} ${isDetailHovered ? style.detailButtonHoverWrapper : ''}`}
                        onMouseEnter={() => setIsDetailHovered(true)}
                        onMouseLeave={() => setIsDetailHovered(false)}
                        onClick={() => onClickMovePage('detail')}
                    >
                        자세히 보기
                    </button>

                    <button
                        type="button"
                        className={`${style.detailButtonWrapper} ${isEtaHovered ? style.detailButtonHoverWrapper : ''}`}
                        onMouseEnter={() => setIsEtaHovered(true)}
                        onMouseLeave={() => setIsEtaHovered(false)}
                        onClick={() => onClickMovePage('eta')}
                    >
                        비자 신청 페이지로 이동
                    </button>
                </div>
            </div>
        </>
    );
}
