# yhacks_proj
For YHacks 2020


## Inspiration

The COVID-19 pandemic resulted in many normal interactions being converted into digital ones; classes shifted to Zooms, extended families held FaceTime holidays instead of congregating, and people texted one another instead of meeting up in person.
However, activism of all kinds did not stop for the pandemic. Indeed, discussions about topics such as Black Lives Matter, political activism, and climate change kept going. We wanted to provide a platform where these conversations could all happen in one place instead of being spread out across the internet. We want to make activism more accessible in a digital age where the sheer volume of disparate links and posts can be overwhelming.


## What it does

Traction allows users to join and create public and private communities across many different categories of causes they might be passionate about- including social justice, environmental activism, political activism, education policy, healthcare, and so much more. Within these categories are all sorts of communities that focus more specifically on topics that people care about. 
Once a user joins a community, they can participate in various threads. These threads might be facilitating general discussion, providing a space to hold a digital event, and provide spaces for people to brainstorm or rally together. 


## How we built it / our technology stack

We developed our backend using Django, using Websockets to facilitate communication between the server and the browser.
We developed our front end using React in conjunction with Material-UI, using some Material components in order to construct our own. 


## Challenges we ran into
We had some difficulties with WebSockets initially, plus it was a challenge to figure out how to connect information from the backend with the front end. 


## Accomplishments that we're proud of
We’re extremely proud about building a full stack web application in a bit under a week.
Additionally, we all learned more about React.js, Material-UI, and additionally Django. At least one of our team members had never used Websockets before either. 


## What we learned
We definitely learned more about the various programming languages that we utilized (React.js, Django, etc). We learned a lot about collaborating in a virtual environment. In addition to our ‘hard’ coding skills, we utilized ‘soft’ skills regarding communication.
We also reflected on examples of activism we’ve seen in our everyday lives in order to try to make the product more useful.


## What's next for traction
Eventually we want to develop Traction into a mobile app to make it even more accessible- after all, more people have mobile phones than have access to a computer. This could allow for people to have more flexibility in where and how they use Traction. They would not need to be seated at their computer in order to stay in the loop and stay active in discussions.


# How do I run it?
###### these instructions are for Mac

You can start the React app simply by navigating into the project folder (`cd yhacks-app`) and then running `yarn start`.

Then, add the backend! `git clone https://github.com/rehoboth23/yhack_backend.git`

Then, it's time to create a virtual environment on your own machine. Once you have `cd yhack_backend`, type `python3 -m venv myenv` (or whatever name you choose to call your venv).

On Mac: `source myenv/bin/activate` (change the name to be what you named your venv).

Once your venv is activated, `python -m pip install --upgrade pip`

Use pip to install django! `pip install -r requirements.txt`

(You may need to also do `python -m pip install django-cors-headers`)

Then, `cd yhacks` and type `python3 manage.py migrate` and/or `python3 manage.py runserver`.

Have fun exploring!


