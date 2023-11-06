import { Hearts } from 'react-loader-spinner'
export const Loader = () => {
    return (
        <div className='loader'>
            <Hearts
                height="90"
                width="90"
                color="#f5adc5"
                ariaLabel="hearts-loading"
                wrapperStyle={{}}
                wrapperClass="wrapper-class"
                visible={true}
            />
        </div>
    )
}

