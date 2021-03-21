import { useEffect, useRef, useState } from "react";
import aituBridge from "@btsd/aitu-bridge";
import {
  IonApp,
  IonAlert,
  IonSlides,
  IonSlide,
  IonContent,
  IonText,
  IonToggle
} from "@ionic/react";
import React from 'react';
import { IonGrid, IonRow, IonCol } from '@ionic/react';
import { IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonItem, IonIcon, IonLabel, IonButton } from '@ionic/react';
import { pin, wifi, wine, warning, walk } from 'ionicons/icons';
import {IonAvatar,IonCheckbox} from '@ionic/react';
import { useHistory } from "react-router-dom";
import {Route,Link} from "react-router-dom";
import "./App.css";
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

const Shop: React.FC = () => {
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

  const [checked, setChecked] = useState(false);

  const [showAlert1, setShowAlert1] = useState(false);
  
  return (  
    <IonPage>
    <IonHeader>
        <IonAvatar>
        <img src="/assets/doom.jpg" />
    </IonAvatar>
    
      <IonToolbar>
        <IonTitle>{name}'s Shop</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent>
      <IonCard>
      <IonGrid>
      <IonRow>
        <IonCol><img src="/assets/coffee.png"/></IonCol>
        <IonCol>  <IonCard>
        <IonCardHeader>
          <IonCardSubtitle>One free coffee (1500 Aicoins)</IonCardSubtitle>
          <IonCardTitle></IonCardTitle>
        </IonCardHeader>
        <IonButton onClick={() => setShowAlert1(true)} expand="block">Purchase</IonButton>
        <IonAlert
          isOpen={showAlert1}
          onDidDismiss={() => setShowAlert1(false)}
          cssClass='my-custom-class'
          header={'Confirmation'}
          message={'Are you sure you want to <strong>buy</strong> coffee?'}
          buttons={[
            {
              text: 'Cancel',
              role: 'cancel',
              cssClass: 'secondary',
              handler: blah => {
                console.log('Confirm Cancel: blah');
              }
            },
            {
              text: 'Okay',
              handler: () => {
                console.log('Confirm Okay');
              }
            }
          ]}
        />
      </IonCard> </IonCol>
      </IonRow> 
      <IonRow>
        <IonCol><img src="/assets/taxi.png"/></IonCol>
        <IonCol> <IonCard>
        <IonCardHeader>
          <IonCardSubtitle>Free ride on a taxi (5000 Aicoins)</IonCardSubtitle>
          <IonCardTitle></IonCardTitle>
        </IonCardHeader>
        <IonButton onClick={() => setShowAlert1(true)} expand="block">Purchase</IonButton>
        <IonAlert
          isOpen={showAlert1}
          onDidDismiss={() => setShowAlert1(false)}
          cssClass='my-custom-class'
          header={'Confirmation'}
          message={'Are you sure you want to <strong>buy</strong> coffee?'}
          buttons={[
            {
              text: 'Cancel',
              role: 'cancel',
              cssClass: 'secondary',
              handler: blah => {
                console.log('Confirm Cancel: blah');
              }
            },
            {
              text: 'Okay',
              handler: () => {
                console.log('Confirm Okay');
              }
            }
          ]}
        />
      </IonCard> </IonCol>
      </IonRow> 
      <IonRow>
        <IonCol><img src="/assets/laptop.png"/></IonCol>
        <IonCol> <IonCard>
        <IonCardHeader>
          <IonCardSubtitle>Brand new laptop (5000000 Aicoins)</IonCardSubtitle>
          <IonCardTitle></IonCardTitle>
        </IonCardHeader>
        <IonButton onClick={() => setShowAlert1(true)} expand="block">Purchase</IonButton>
        <IonAlert
          isOpen={showAlert1}
          onDidDismiss={() => setShowAlert1(false)}
          cssClass='my-custom-class'
          header={'Confirmation'}
          message={'Are you sure you want to <strong>buy</strong> coffee?'}
          buttons={[
            {
              text: 'Cancel',
              role: 'cancel',
              cssClass: 'secondary',
              handler: blah => {
                console.log('Confirm Cancel: blah');
              }
            },
            {
              text: 'Okay',
              handler: () => {
                console.log('Confirm Okay');
              }
            }
          ]}
        />
      </IonCard> </IonCol>
      </IonRow> 
       </IonGrid>
      </IonCard>
    </IonContent>
  </IonPage>
 
  );
};

export default Shop;
