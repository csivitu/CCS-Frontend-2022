import { authorize } from '../lib/authorize'

const projects = () => {
    return <div>Hi this is projects</div>;
};

export default projects;

export const getServerSideProps = authorize(
    async (_ctx) => {
        return {
            props: {},
        }
    }
)