import style from "../../../assets/scss/common/main.module.scss";

export function TestimonialField() {

    const testimonialsDummyData = [
        {
            title: '"Three months of preparation and successful employment"',
            description: '내가 어떻게 취업을 할 수 있게 되었고.. 내가 어떻게 취업을 할 수 있게 되었고.. 내가 어떻게 취업을 할 수 있게 되었고..',
            thumbnail: '',
            registeredDat: '2024.01.01',
        },
        {
            title: '"I don\'t even know how to speak English."',
            description: '영어 공부를 어떻게 했고.......영어 공부를 어떻게 했고.......영어 공부를 어떻게 했고.......영어 공부를 어떻게 했고.......',
            thumbnail: '',
            registeredDat: '2024.03.22',
        },
        {
            title: 'test dummy data',
            description: 'ㄱㄴㄷㄹㅁㅂㅅㅇㅈㅊㅋㅌㅍㅎ ',
            thumbnail: '',
            registeredDat: '2024.01.11',
        },
        {
            title: 'test dummy data',
            description: 'blah blah blah blah blah blah ',
            thumbnail: '',
            registeredDat: '2024.01.11',
        },
        {
            title: 'test dummy data',
            description: 'blah blah blah blah blah blah ',
            thumbnail: '',
            registeredDat: '2024.01.11',
        },

    ];

    return (
        <div className={style.testimonialsMainWrapper}>
            <div className={style.testimonialsTitleWrapper}>
                <span className={style.text}>Testimonials</span>
            </div>

            <div className={style.testimonialsContentWrapper}>
                {testimonialsDummyData.map((data,idx) => (
                    <div className={style.testimonialsContent} key={idx}>
                        <div className={style.thumbnailWrapper}>
                            {/*<img className={style.thumbnail} src="thumbnail.jpg" alt="Thumbnail"/>*/}
                        </div>
                        <div className={style.descriptionWrapper}>
                            <span className={style.titleText}>
                                {data.title}
                            </span>
                            <span className={style.subTitleText}>
                                {data.description}
                            </span>
                        </div>
                        <span className={style.text}>{data.registeredDat}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}