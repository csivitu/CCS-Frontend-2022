import { Fab, Tooltip } from '@mui/material';
import Discord from '../../public/assets/Discord.svg';

function FloatingDiscord() {
    return (
        <div className="fixed bottom-5 right-5 z-50">
            <Tooltip title="Reach out to us on our discord server, if you have any doubts." placement="left" arrow>
                <a href="https://discord.gg/nWW7Zegqxd" target="_blank" rel="noreferrer">
                    <Fab
                        color="primary"
                        aria-label="add"
                        className="bg-peach z-30 text-gray-dark text-2xl drop-shadow-sm hover:drop-shadow-lg"
                    >
                        <Discord />
                    </Fab>
                </a>
            </Tooltip>
        </div>
    );
}

export default FloatingDiscord;
