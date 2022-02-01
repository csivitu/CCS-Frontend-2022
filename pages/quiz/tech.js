import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined';

function tech() {
    return (
        <div class="flex flex-nowrap flex-row">
            <div class="w justify-items-center py-20"><img src="https://i.imgur.com/lRnF8fm.png" /></div>
            <div class="w-4/5 flex flex-col content-center justify-items-center">
                <div class="flex flex-rows">
                    <div class="pt-20 text-blue-500 text-base">Domain: <b>TECH</b></div>
                    <div class="pt-20 ml-auto"> <WatchLaterOutlinedIcon color="primary" /></div>
                    <div class="pt-20 pl-5">01:40</div>
                </div>
                <div class="flex flex-rows pt-10">
                    <div class="font-bold"> QUESTION 1 <br />
                        <p class="font-light">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id volutpat mattis etiam scelerisque sagittis, enim sagittis quis.
                            Odio vivamus posuere adipiscing egestas enim maecenas mauris arcu. Ut est, consequat, non morbi rhoncus.
                            Ornare ut massa, elementum sit elementum tellus urna. </p>
                    </div>
                    <div><img src="https://i.imgur.com/dx2BEFF.png" class="aspect-square" style={{ width: '400px' }}></img></div>
                </div>
                <div class="flex flex-rows font-bold pt-10 pb-4">
                    YOUR ANSWER
                </div>
                <div class="flex flex-rows bg-blue-500 bg-opacity-50 rounded-md p-10">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Facilisi mi elementum eget tincidunt non duis. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Facilisi mi elementum eget tincidunt non duis. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Facilisi mi elementum eget tincidunt non duis. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Facilisi mi elementum eget tincidunt non duis. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Facilisi mi elementum eget tincidunt non duis. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Facilisi mi elementum eget tincidunt non duis. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Facilisi mi elementum eget tincidunt non duis. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Facilisi mi elementum eget tincidunt non duis. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Facilisi mi elementum eget tincidunt non duis. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Facilisi mi elementum eget tincidunt non duis. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Facilisi mi elementum eget tincidunt non duis. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Facilisi mi elementum eget tincidunt non duis.
                </div>
                <div class="flex flex-rows rounded-md pt-5 gap-4">
                    <button class="text-black bg-stone-300 p-2 px-8 rounded-md">PREVIOUS</button>
                    <button class="text-black bg-stone-300 p-2 px-8 rounded-md">NEXT</button>
                    <button class="bg-blue-500 p-2 px-8 rounded-md ml-auto">SUBMIT</button>
                </div>
                <div class="flex flex-rows justify-items-center gap-4 p-2">
                    <button class="text-black bg-blue-500 rounded-full p-2">1</button>
                    <button class="text-black bg-stone-300 rounded-full p-2">2</button>
                    <button class="text-black bg-stone-300 rounded-full p-2">3</button>
                    <button class="text-black bg-stone-300 rounded-full p-2">4</button>
                    <button class="text-black bg-stone-300 rounded-full p-2">5</button>
                    <button class="text-black bg-stone-300 rounded-full p-2">6</button>
                    <button class="text-black bg-stone-300 rounded-full p-2">7</button>
                    <button class="text-black bg-stone-300 rounded-full p-2">8</button>
                    <button class="text-black bg-stone-300 rounded-full p-2">9</button>
                    <button class="text-black bg-stone-300 rounded-full p-2">10</button>
                </div>
            </div>
            <div class="w-1/6"></div>
        </div>
    );
}

export default tech;