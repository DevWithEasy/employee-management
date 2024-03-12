import { useZxing } from "react-zxing";
import audioFile from '../../assets/store-scanner-beep.mp3';

const Scanner_Attendance = ({setScaneSearch,audioRef }) => {
    const { ref } = useZxing({
        onDecodeResult(result) {
            setScaneSearch(result.getText())
        },
    });
    return (
        <div
            className='z-10 overflow-hidden rounded-md'
        >
            <video
                ref={ref}
                className='w-[100%] bg-cover'
            />
            <audio ref={audioRef}>
                <source src={audioFile} type="audio/mp3" />
            </audio>
        </div>
    );
};

export default Scanner_Attendance;
