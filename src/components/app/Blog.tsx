const Blog = (): JSX.Element => {
    const handleAddBlogLink = (): void => {
        const blogLink = 'https://bo5mi.tistory.com/';
        window.open(blogLink, '_blank');
    };

    return (
        <div className="w-full h-full">
            <img src="./desktop/blog.png" />
            <div className="cursor-pointer" onClick={() => handleAddBlogLink()}>
                <div className="w-full mx-5 mb-1">[블로그 이슈] iframe 적용기 및 Google AdSense 정책 접촉</div>
                <div className="mx-5 text-xs text-gray-600 mb-3">
                    iframe을 활용하여 앱 내 블로그를 삽입하려고 했지만 (실제로 브라우저처럼 작동하였다!), iframe으로
                    blog를 불러오는 부분에서 google adsense 정책에 접촉이 되어 google adsense가 block이 되었다.🥲
                </div>
                <div className="mx-5 text-xs text-blue-800 pb-5">
                    *iframe (inline frame)
                    <br />
                    HTML 문서 내에 다른 HTML 문서를 삽입할 수 있는 HTML 요소로, 웹 페이지 안에 독립적인 다른 웹 페이지를
                    포함시키는 방식이다.
                </div>
            </div>
        </div>
    );
};

export default Blog;
