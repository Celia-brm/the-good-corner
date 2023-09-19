import express, { Request, Response } from "express";
import {Ad} from "./types";

const app = express();
const port = 3000;


 let ads: Ad [] = [
    {
      id: 1,
      title: "Bike to sell",
      description:
        "My bike is blue, working fine. I'm selling it because I've got a new one",
      owner: "bike.seller@gmail.com",
      price: 100,
      picture:
        "https://images.lecho.be/view?iid=dc:113129565&context=ONLINE&ratio=16/9&width=640&u=1508242455000",
      location: "Paris",
      createdAt: "2023-09-05T10:13:14.755Z",
    },
    {
      id: 2,
      title: "Car to sell",
      description:
        "My car is blue, working fine. I'm selling it because I've got a new one",
      owner: "car.seller@gmail.com",
      price: 10000,
      picture:
        "https://www.automobile-magazine.fr/asset/cms/34973/config/28294/apres-plusieurs-prototypes-la-bollore-bluecar-a-fini-par-devoiler-sa-version-definitive.jpg",
      location: "Paris",
      createdAt: "2023-10-05T10:14:15.922Z",
    },
  ];

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.send(ads)
})

  
app.get("/ads", (req: Request, res: Response) => {
  res.send(ads)
})


app.post("/ads", (req: Request, res: Response) => {
const id = ads.length + 1;
const newAd : Ad = {
    ...req.body,
    id, 
    createdAt : new Date().toISOString(),
};
    ads.push(req.body)
    res.send(newAd)
})
 
  

app.delete ("/ads/:id", (req: Request, res: Response) => {
    const idOfAdToDelete = parseInt(req.params.id, 10)
    if(!ads.find((ad) => ad.id !== idOfAdToDelete )) return res.sendStatus(404);
    
    /*ads = ads.filter((ad) => ad.id !== idOfAdToDelete)
    }*/

    ads.splice(
        ads.findIndex((ad) => ad.id === idOfAdToDelete)
    );
    res.sendStatus(204).send({message :"ad deleted !"})
})


app.patch("/ads/:id",(req: Request, res: Response) => {
    const idOfAdToUpdate = parseInt(req.params.id, 10)
    if(!ads.find((ad) => ad.id === idOfAdToUpdate )) return res.sendStatus(404);
    
    //imperative way
    const indexOfAdToUpdate = ads.findIndex((ad) => ad.id === idOfAdToUpdate);
    console.log(indexOfAdToUpdate)
      /* ads [indexOfAdToUpdate] ={
        ...ads[indexOfAdToUpdate],
         ...req.body,
      } */

    //declarative way
    ads = ads.map((ad)=> {
      if (ad.id === idOfAdToUpdate) return {...ad, ...req.body}
      else return ad;
    });
    res.send(ads[indexOfAdToUpdate]);
})


app.get("/ads/:id", (request, response) => {
  const id = parseInt(request.params.id);
  const ad = ads.find((ad) => ad.id === id);
  if (!ad) {
    response.sendStatus(404);
  }
  response.json({ ad });
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});