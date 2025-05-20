import {useCallback, useState} from "react";
import {useCookieFunctions} from "../../../common/hooks/useCookieFunctions";
import {NewsLetterDeleteDTO, NewsLetterDTO} from "../../../../types/adminNewsLetter";
import {convertTimeToFormat} from "../../../../util/etcUtil";
import {RawNewsLetterDTO} from "../../../../types/rawNewsLetter";

export function useNewsLetterActions() {
    const { getCookie } = useCookieFunctions();
    const [loading, setLoading] = useState<boolean>(false);

    // 뉴스레터 삭제 함수
    const deleteNewsletters = useCallback(
        async (selectedNewsletterIds: NewsLetterDeleteDTO) => {
        try {
            setLoading(true);
            const accessToken = getCookie('accessToken');

            const response = await fetch(
                `${process.env.REACT_APP_BASE_URL}/admin/news`,
                {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(selectedNewsletterIds)
                }
            );

            if (!response.ok) {
                throw new Error('Failed to delete newsletters');
            }

            return true;
        } catch (error) {
            console.error('Error deleting newsletters:', error);
            return false;
        } finally {
            setLoading(false);
        }
    }, [getCookie]);

    // 뉴스레터 생성/수정 함수
    const saveNewsletter = useCallback(
        async (formData: NewsLetterDTO, newsletterId?: number) => {
        try {
            setLoading(true);
            const accessToken = getCookie('accessToken');
            const isEditing = !!newsletterId;

            const url = isEditing
                ? `${process.env.REACT_APP_BASE_URL}/admin/news/${newsletterId}`
                : `${process.env.REACT_APP_BASE_URL}/admin/news`;

            const response = await fetch(url, {
                method: isEditing ? 'PUT' : 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: formData.title,
                    content: formData.content,
                    sentAt: convertTimeToFormat(formData.sentAt)
                })
            });

            if (!response.ok) {
                throw new Error(`Failed to ${isEditing ? 'update' : 'create'} newsletter`);
            }

            return true;
        } catch (error) {
            console.error(`Error ${newsletterId ? 'updating' : 'creating'} newsletter:`, error);
            return false;
        } finally {
            setLoading(false);
        }
    }, [getCookie]);

    // 병합된 뉴스레터 저장 함수
    const saveMergedNewsletter = useCallback(
        async (mergedTitle: string, mergedContent: string) => {
        try {
            setLoading(true);
            const accessToken = getCookie('accessToken');

            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/admin/news`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: mergedTitle,
                    content: mergedContent,
                    sentAt: null // 기본값은 발송 예정일 없음
                })
            });

            if (!response.ok) {
                throw new Error('Failed to create merged newsletter');
            }

            return true;
        } catch (error) {
            console.error('Error creating merged newsletter:', error);
            return false;
        } finally {
            setLoading(false);
        }
    }, [getCookie]);

    // 병합할 뉴스레터 준비 함수
    const prepareMergeContent = useCallback((newsletters: RawNewsLetterDTO[]) => {
        // 제목 생성 (첫 번째 뉴스레터 제목 기준)
        const baseTitle = newsletters[0]?.title || '';
        const mergedTitle = `${baseTitle} 외 ${newsletters.length - 1}개 병합`;

        // 내용 병합 (각 뉴스레터 내용 사이에 구분선 추가)
        const combinedContent = newsletters.map(newsletter => {
            return `<div class="merged-newsletter-item">
                <h3>${newsletter.title}</h3>
                <div class="merged-newsletter-content">
                    ${newsletter.content}
                </div>
            </div>
            <hr class="newsletter-divider" />`;
        }).join('\n\n');

        return {
            mergedTitle,
            combinedContent
        };
    }, []);

    return {
        deleteNewsletters,
        saveNewsletter,
        saveMergedNewsletter,
        prepareMergeContent,
        loading
    };
}