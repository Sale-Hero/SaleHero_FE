import style from "../../assets/scss/sub/community.module.scss";
import {useNavigate} from "react-router-dom";
import {useCookies} from "react-cookie";
import {CommunityFormProps} from "../../types/community";

export function CommunityEmpty() {
    const navigate = useNavigate()
    const [cookie] = useCookies(['accessToken', 'refreshToken']);

    // @ts-ignore
    const onClickPosting = () => {
        if (!cookie.accessToken) {
            alert('로그인 후 시도해주세요');
            return false;
        }
        const props: CommunityFormProps =
            {mode: 'create'}
        navigate('/community/post', {state: {...props}});
    };

    return (
        <div className={style.emptyStateWrapper}>
            <div className={style.emptyStateIcon}>📝</div>
            <h3 className={style.emptyStateTitle}>아직 작성된 글이 없어요</h3>
            <p className={style.emptyStateDescription}>
                첫 번째 글을 작성해보세요!
            </p>
            <button
                className={style.emptyStateButton}
                onClick={onClickPosting} // 글쓰기 버튼 클릭 핸들러
            >
                새 글 작성하기
            </button>
        </div>
    )
}