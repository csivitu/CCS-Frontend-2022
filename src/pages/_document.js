import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <meta name="title" content="CSI - Core Committee enrollments" />
                    <meta
                        name="description"
                        content="Computer Society of India-VIT brings together some of the best designers, developers, and tech enthusiasts who collaborate and organize various events, workshops and hackathons every year with the motivation of pushing technology forward and fostering a community of tech enthusiasts."
                    />

                    <meta property="og:site_name" content="ccs" />
                    <meta property="og:type" content="website" />
                    <meta property="og:url" content="https://enrollments.csivit.com/" />
                    <meta property="og:title" content="CSI - Core Committee enrollments" />
                    <meta
                        property="og:description"
                        content="Computer Society of India-VIT brings together some of the best designers, developers, and tech enthusiasts who collaborate and organize various events, workshops and hackathons every year with the motivation of pushing technology forward and fostering a community of tech enthusiasts."
                    />
                    <meta property="og:image" itemProp="image" content="https://enrollments.csivit.com/ccs_banner.png" />

                    <meta property="twitter:card" content="summary_large_image" />
                    <meta property="twitter:url" content="https://enrollments.csivit.com/" />
                    <meta property="twitter:title" content="CSI - Core Committee enrollments" />
                    <meta
                        property="twitter:description"
                        content="Computer Society of India-VIT brings together some of the best designers, developers, and tech enthusiasts who collaborate and organize various events, workshops and hackathons every year with the motivation of pushing technology forward and fostering a community of tech enthusiasts."
                    />
                    <meta property="twitter:image" content="https://enrollments.csivit.com/ccs_banner.png" />

                    <meta name="keywords" content="ccs" />
                    <link
                        rel="preload"
                        href="/fonts/GeneralSans/GeneralSans-Regular.woff2"
                        as="font"
                        type="font/woff2"
                        crossOrigin="true"
                    />
                    <link
                        rel="preload"
                        href="/fonts/GeneralSans/GeneralSans-Medium.woff2"
                        as="font"
                        type="font/woff2"
                        crossOrigin="true"
                    />
                    <link
                        rel="preload"
                        href="/fonts/GeneralSans/GeneralSans-Semibold.woff2"
                        as="font"
                        type="font/woff2"
                        crossOrigin="true"
                    />
                    <link
                        rel="preload"
                        href="/fonts/GeneralSans/GeneralSans-Bold.woff2"
                        as="font"
                        type="font/woff2"
                        crossOrigin="true"
                    />
                    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                    <link rel="manifest" href="/site.webmanifest" />
                    <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
                    <meta name="msapplication-TileColor" content="#da532c" />
                    <meta name="theme-color" content="#131313 " />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
