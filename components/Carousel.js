import {useState} from 'react'
import Slider from 'react-slick'
import {FaChevronLeft, FaChevronRight} from 'react-icons'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'


export default function Carousel() {
    const [sliderRef, setSliderRef] = useState(null)

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,  // 一次顯示幾張
        slidesToScroll: 1, // 按下一頁的時候，要跑幾張
        centerMode:true,
        arrow:true,
        center:true,
  
    };

    const announcement =[
        {
            imageSrc:
        'https://images.unsplash.com/photo-1559508551-44bff1de756b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80',
        }

    ]
    return (

        
            <div className="container">
                <button onCLick={sliderRef?.slickPrev}>
                    <FaChevronLeft />
                </button>
                <button onCLick={sliderRef?.slickNext}>
                    <FaChevronRight />
                </button>
                <Slider ref={setSliderRef} {...sliderSettings}></Slider>
              
                    <Slider {...settings}>
                    <div >
                    <Image src={navpic}/>
                    </div>
                    <div>
                        <Image src={ezlogo}/>
                    </div>  
                    </Slider>
                    </div>
        
    
        // <div className='content'></div>
      )
}