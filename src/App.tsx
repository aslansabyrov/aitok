import { useEffect, useRef, useState } from "react";
import aituBridge from "@btsd/aitu-bridge";
import {
  IonApp,
  IonSlides,
  IonSlide,
  IonContent,
  IonButton,
  IonText,
  
} from "@ionic/react";

import { useHistory } from "react-router-dom";
import {Route,Link} from "react-router-dom";
import Home from "./Home";
import "./App.css";
import Achievements from "./Achievements"
/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

interface ISlideContentProps {
  title: string;
  onClick: () => void;
  description: string;
  buttonTitle: string;
  imgSrc: string;
}

const SlideContent: React.FC<ISlideContentProps> = ({
  onClick,
  title,
  description,
  buttonTitle,
  imgSrc,
}) => {
  return (
    <>
      <img src={imgSrc} />
      <div className="slide-block">
        <IonText color="dark">
          <h2>{title}</h2>
        </IonText>
        <IonText>
          <sub>{description}</sub>
        </IonText>
      </div>
      <div className="slide-button">
        <IonButton expand="full" onClick={onClick}>
          {buttonTitle}
        </IonButton>
      </div>
    </>
  );
};

const App: React.FC = () => {
  // Optional parameters to pass to the swiper instance.
  // See http://idangero.us/swiper/api/ for valid options.
  const slideOpts = {
    initialSlide: 0,
    speed: 400,
  };
  const slider = useRef<HTMLIonSlidesElement>(null);

  async function getMe() {
    try {
      const data = await aituBridge.getMe();
      setName(data.name);

    } catch (e) {
      // handle error
      console.log(e);
    }
  }
 

  useEffect(() => {
    if (aituBridge.isSupported()) {
      getMe();
    }
  }, []);

  const [name, setName] = useState("<username>");


  const handleButtonClick = () => {
    slider.current?.slideNext();
  }; 
  const history = useHistory();

  const redirecthome = () =>{ 
    let path = `/home`; 
    history.push(path);
  }

  
  return (  
    <IonApp>
      <IonContent>
        <IonSlides pager={true} options={slideOpts} ref={slider}>
          <IonSlide>
            <SlideContent
             title={`${name}, Добро пожаловать в AiTok!`}
              onClick={handleButtonClick}
              description={
                "Приложение, где вы можете зарабатывать баллы исполняя простые задания"
              }
              buttonTitle={"Дальше"}
              imgSrc={"/assets/aitok_purple.png"}
            ></SlideContent>
          </IonSlide>
          <IonSlide>
            <SlideContent
                title={"Ставьте #aitu в свои видео"}
                onClick={handleButtonClick}
                description={
                  "И зарабатывайте AiCoins"
                }
                buttonTitle={"Дальше"}
                imgSrc={"/assets/video_upd_text-removebg-preview.png"}
            ></SlideContent>
          </IonSlide>
          <IonSlide>
            <SlideContent
                title={"Обменивайте AiCoins на ценные призы"}
                onClick={redirecthome}
                description={
                  "От чашечки кофе до цифровых гаджетов"
                }
                buttonTitle={"Далее"}
                imgSrc={"/assets/completed-removebg-preview.png"}
            >
            </SlideContent>
          </IonSlide>
        </IonSlides>
      </IonContent><Route path="/home" component={Home}/>
      <Route path="/achievements" component={Achievements}/>
    </IonApp>
 
  );
};

export default App;
