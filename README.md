
<div align="center">
  <h1>
We'llSEE
</h1>

The Reverse Social Media <br>
A project by [@amansxcalibur](https://github.com/amansxcalibur/), [@itsabhinavm](https://github.com/itsabhinavm/) and [@hrideshmg](https://github.com/hrideshmg)
</div>

### Overview

We’llSEE is a web-based platform designed to support accountability through future-oriented goal sharing. Unlike conventional social applications that focus on past activities, We’llSEE allows users to publish their upcoming plans along with defined deadlines. Other users can respond to these plans using the **Believe** or **Doubt** reactions, creating a simple form of public feedback.

As deadlines approach, the system prompts users to confirm completion by submitting proof. Verification is handled by moderators review. Based on the outcome, the platform updates the user’s karma, rankings on leaderboards, and relevant activity records.
### Key Features

- Plan Posting – Users declare upcoming goals with set deadlines.

- Believe/Doubt Reactions – Community engagement that encourages commitment.

- Proof-Based Verification – Upload images/documents as evidence of completion.

- Karma System – Points for completing plans.

- Leaderboards – Transparent ranking based on accountability.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/amansxcalibur/we-ll-see.git
   cd we-ll-see/ 
   ```

2. Install front-end dependencies:

   ```bash
   cd frontend/ 
   npm install
   ```
3. Install back-end packages on a virtual environmen:
   ```bash
   cd ..
   cd backend/
   python -m venv venv
   source venv/bin/activate/
   pip install -r requirements.txt
   ```
3. Set up environment variables:

   Follow the [.env.sample](https://github.com/amansxcalibur/we-ll-see/blob/main/backend/.env.sample) template and add your own API keys.

4. Start the development server:

   ```bash
   # Run front-end
   npm run dev 
   # Run back-end
   django manage.py runserver
   ```

