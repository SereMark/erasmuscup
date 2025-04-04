/*************************
 * src/pages/HouseCupRulesPage.jsx
 *************************/
import React, { useEffect } from "react"

/**
 * A simple helper to ensure the entire page uses smooth scrolling via CSS.
 * You can also add this to your global CSS if preferred.
 */
function useSmoothScrolling() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth"
    return () => {
      document.documentElement.style.scrollBehavior = "auto"
    }
  }, [])
}

function HouseCupRulesPage() {
  useSmoothScrolling()

  return (
    <section className="p-4 sm:p-6 max-w-4xl mx-auto text-gray-100">
      {/* MAIN TITLE */}
      <h1 className="text-3xl sm:text-4xl font-extrabold mb-6 text-center">
        🏆 House Cup Rules 2025 (Amended 4 April) 🏆
      </h1>

      {/* INTRO / STATUTORY INFO */}
      <div className="mb-6 bg-[#2a2a2a] p-4 sm:p-6 rounded-xl shadow-lg backdrop-blur-md">
        <p className="text-sm sm:text-base leading-relaxed whitespace-pre-wrap">
          <strong>Public Act:</strong> 2025 No 3{"\n"}
          <strong>Date of Assent:</strong> 21 March 2025{"\n"}
          <strong>Commencement:</strong> see section 3(2)

          {"\n\n"}This document includes every word of the original Act (including 4 April 2025
          amendments) with improved styling, emojis, and clickable anchors for easy navigation. 
          <em> No text has been removed or altered.</em>
        </p>
      </div>

      {/* TABLE OF CONTENTS */}
      <div className="mb-10 bg-[#2a2a2a] p-4 sm:p-6 rounded-xl shadow-md backdrop-blur">
        <h2 className="text-xl sm:text-2xl font-bold mb-3">Table of Contents</h2>
        <ul className="list-none pl-0 space-y-1 text-sm sm:text-base">
          <li>
            <a href="#section-1" className="underline hover:text-gray-300">
              1 Interpretation
            </a>
          </li>
          <li>
            <a href="#section-2" className="underline hover:text-gray-300">
              2 Object and Purpose
            </a>
          </li>
          <li className="mt-2 font-semibold">Part 1: The House Cup</li>
          <ul className="list-disc list-inside ml-6 space-y-1">
            <li>
              <a href="#section-3" className="underline hover:text-gray-300">
                3 House Rules
              </a>
            </li>
            <li>
              <a href="#section-4" className="underline hover:text-gray-300">
                4 Participants
              </a>
            </li>
            <li>
              <a href="#section-5" className="underline hover:text-gray-300">
                5 House Events
              </a>
            </li>
          </ul>
          <li className="mt-2 font-semibold">Part 2: House Points</li>
          <ul className="list-disc list-inside ml-6 space-y-1">
            <li>
              <a href="#section-6" className="underline hover:text-gray-300">
                6 Award of House Points
              </a>
            </li>
            <li>
              <a href="#section-7" className="underline hover:text-gray-300">
                7 Revocation of House Points
              </a>
            </li>
          </ul>
          <li className="mt-2 font-semibold">Part 3: Recommendations</li>
          <ul className="list-disc list-inside ml-6 space-y-1">
            <li>
              <a href="#section-8" className="underline hover:text-gray-300">
                8 Event Selection and Decision
              </a>
            </li>
            <li>
              <a href="#section-9" className="underline hover:text-gray-300">
                9 Overthrowing the Event Organisers
              </a>
            </li>
            <li>
              <a href="#section-10" className="underline hover:text-gray-300">
                10 Constructive Feedback
              </a>
            </li>
          </ul>
          <li className="mt-2 font-semibold">Part 4: Bonus Points</li>
          <ul className="list-disc list-inside ml-6 space-y-1">
            <li>
              <a href="#section-11" className="underline hover:text-gray-300">
                11 Attendance and Pride
              </a>
            </li>
            <li>
              <a href="#section-12" className="underline hover:text-gray-300">
                12 Gambits
              </a>
            </li>
            <li>
              <a href="#section-12a" className="underline hover:text-gray-300">
                12a Super Gambits
              </a>
            </li>
            <li>
              <a href="#section-12b" className="underline hover:text-gray-300">
                12b Armistices
              </a>
            </li>
          </ul>
          <li className="mt-2 font-semibold">Part 5: Punishment</li>
          <ul className="list-disc list-inside ml-6 space-y-1">
            <li>
              <a href="#section-13" className="underline hover:text-gray-300">
                13 Establishment of House Crimes
              </a>
            </li>
            <li>
              <a href="#section-14" className="underline hover:text-gray-300">
                14 Cheating
              </a>
            </li>
            <li>
              <a href="#section-15" className="underline hover:text-gray-300">
                15 Treason
              </a>
            </li>
            <li>
              <a href="#section-16" className="underline hover:text-gray-300">
                16 Public Nudity
              </a>
            </li>
            <li>
              <a href="#section-17" className="underline hover:text-gray-300">
                17 Murder
              </a>
            </li>
            <li>
              <a href="#section-18" className="underline hover:text-gray-300">
                18 Losing the House Cup
              </a>
            </li>
          </ul>
          <li className="mt-2 font-semibold">Part 6: Roles</li>
          <ul className="list-disc list-inside ml-6 space-y-1">
            <li>
              <a href="#section-19" className="underline hover:text-gray-300">
                19 House Roles
              </a>
            </li>
          </ul>
          <li className="mt-2 font-semibold">
            <a href="#schedule-1" className="underline hover:text-gray-300">
              Schedule 1: House Cup Register
            </a>
          </li>
        </ul>
      </div>

      {/* FULL TEXT CARDS */}
      <RuleCard
        id="section-1"
        title="1 Interpretation"
        text={section1}
        emoji="🔍"
      />
      <RuleCard
        id="section-2"
        title="2 Object and Purpose"
        text={section2}
        emoji="🎯"
      />

      <PartHeading partNumber={1} title="The House Cup" id="part-1" />

      <RuleCard id="section-3" title="3 House Rules" text={section3} emoji="📝" />
      <RuleCard id="section-4" title="4 Participants" text={section4} emoji="👥" />
      <RuleCard id="section-5" title="5 House Events" text={section5} emoji="🎉" />

      <PartHeading partNumber={2} title="House Points" id="part-2" />
      <RuleCard id="section-6" title="6 Award of House Points" text={section6} emoji="✨" />
      <RuleCard id="section-7" title="7 Revocation of House Points" text={section7} emoji="⚠️" />

      <PartHeading partNumber={3} title="Recommendations" id="part-3" />
      <RuleCard id="section-8" title="8 Event Selection and Decision" text={section8} emoji="🤝" />
      <RuleCard id="section-9" title="9 Overthrowing the Event Organisers" text={section9} emoji="💥" />
      <RuleCard id="section-10" title="10 Constructive Feedback" text={section10} emoji="🧐" />

      <PartHeading partNumber={4} title="Bonus Points" id="part-4" />
      <RuleCard id="section-11" title="11 Attendance and Pride" text={section11} emoji="🎖" />
      <RuleCard id="section-12" title="12 Gambits" text={section12} emoji="🎲" />
      <RuleCard id="section-12a" title="12a Super Gambits" text={section12a} emoji="💥" />
      <RuleCard id="section-12b" title="12b Armistices" text={section12b} emoji="🤝" />

      <PartHeading partNumber={5} title="Punishment" id="part-5" />
      <RuleCard id="section-13" title="13 Establishment of House Crimes" text={section13} emoji="🚫" />
      <RuleCard id="section-14" title="14 Cheating" text={section14} emoji="❌" />
      <RuleCard id="section-15" title="15 Treason" text={section15} emoji="⚔️" />
      <RuleCard id="section-16" title="16 Public Nudity" text={section16} emoji="🍑" />
      <RuleCard id="section-17" title="17 Murder" text={section17} emoji="🔪" />
      <RuleCard id="section-18" title="18 Losing the House Cup" text={section18} emoji="⚰️" />

      <PartHeading partNumber={6} title="Roles" id="part-6" />
      <RuleCard id="section-19" title="19 House Roles" text={section19} emoji="🎩" />

      {/* SCHEDULE 1 */}
      <ScheduleCard id="schedule-1" text={schedule1Text} />
    </section>
  )
}

/************************************************************************
 * Individual Components for Layout
 ************************************************************************/

/**
 * Renders a Part heading. E.g. "Part 1: The House Cup"
 */
function PartHeading({ partNumber, title, id }) {
  return (
    <div
      id={id}
      className="my-8 bg-[#1f1f1f] p-4 sm:p-6 rounded-xl shadow-lg backdrop-blur-md"
    >
      <h2 className="text-2xl sm:text-3xl font-extrabold">
        🗂 Part {partNumber}: {title}
      </h2>
    </div>
  )
}

/**
 * Renders a single rule "section" with a title, an ID for anchor linking,
 * and the raw text. 
 */
function RuleCard({ id, title, text, emoji = "👉" }) {
  return (
    <div
      id={id}
      className="mb-8 bg-[#2a2a2a] p-4 sm:p-6 rounded-xl shadow-md backdrop-blur"
    >
      <h3 className="text-xl sm:text-2xl font-bold mb-3 flex items-center gap-2">
        <span>{emoji}</span> {title}
      </h3>
      <div className="text-sm sm:text-base whitespace-pre-wrap leading-relaxed">
        {text}
      </div>
    </div>
  )
}

/**
 * Renders the 'Schedule 1' card. We pass the entire text as a prop to keep
 * code tidy. 
 */
function ScheduleCard({ id, text }) {
  return (
    <div
      id={id}
      className="mt-8 bg-[#2a2a2a] p-4 sm:p-6 rounded-xl shadow-md backdrop-blur"
    >
      <h3 className="text-xl sm:text-2xl font-bold mb-3 flex items-center gap-2">
        <span>📜</span> Schedule 1: House Cup Register
      </h3>
      <div className="text-sm sm:text-base whitespace-pre-wrap leading-relaxed">
        {text}
      </div>
    </div>
  )
}

/************************************************************************
 * Original Full Text (split into constants for easier reading)
 ************************************************************************/

/* 
   NOTE: Each constant below is EXACT text from the official PDF,
   arranged by section. We only added line breaks where appropriate.
   No content is removed or altered.
*/

const section1 = `
(1) In this Act, unless the context otherwise requires,—

Basic Rules are the rules as outlined in section 3(a) and (b).
Buffaloed is being caught drinking with your right hand, when another Participant says “buffalo” to you.
Cool Shit is any shit that is cool, as decided by a Judge from the House Cup Courts Act 2025, or by 3 out of the 4 House Captains in their collective capacity.
Founders are the 12 initial participants, taking part in the opening ceremony of 21 March 2025.
Four Houses are the four groups given identity by the Founders on 21 March 2025.
Gambits are impromptu House Events that occur outside regular House Events. They can be any game/challenge of the Participants’ choice.
House Captains are elected representatives, being one from each house, as selected on the 21 March 2025.
House Cup refers to the competition this Act prescribes.
House Events are games, challenges, matches or any other method of point derivation, as agreed upon by the Participants.
House Points are intangible units of scoring that can be cashed in at any point for jelly beans.
House Pokal is the physical cup that the winning House receives.
House Rules are the rules as defined in this Act.
How’s That’ed is being caught opening a can or bottle without first saying “not out”, when another Participant says “how’s that” to you.
Participant is any natural person organised into a house by the personality quiz, and signed onto the House Cup Registration sheet in Schedule 1.
Point System is the system of point award and revocation as prescribed in Part 2.
Yardie is a yard glass full of beer. And doing a Yardie is drinking the entire thing in one go.
`

const section2 = `
(1) The objective of the House Competition is to determine the strongest Erasmus students to breed
the next wave or Erasmus students by virtue of Darwinian Evolution.

(2) The Purpose of these House Rules are to establish and clarify the mechanisms of the House
Competition.

(3) This is not a cult, admission is not to be restricted for any reason.
`

const section3 = `
(1) This Act hereby establishes the House Cup.
(2) These House Rules come into effect upon assent and signature of the four House Captains at the
foot of each page, and cease to take effect at midnight on the date of the Strawberry Moon.
(3) The Basic Rules are as follows—
(a) On 21 March 2025, the 12 Founders are to convene, each taking the 16Personalities Test
and forming the Four Houses.
(b) Upon the constitution of the Four Houses, the Founders are to determine the following for
each of their houses.
    (i) House Name
    (ii) House Colour and Trim
    (iii) House Animal
    (iv) House Sigil
    (v) House Anthem
    (vi) House Motto
    (vii) House Values
    (viii) House Captain
(c) The Four Houses will compete in weekly House Events, earning points for their house in
accordance with the Point System outlined in Part 2.
(d) Participants may be added to the House Cup by registration in the House Cup Register,
appended to this Act in Schedule 1.
(e) The winning house by the date of the Strawberry Moon will receive the House Pokal, and
will not be executed by public hanging.
(f) The losing houses will receive nothing, and will be executed by public hanging unless
they successfully perform a Yardie no later than one week after the date of the Strawberry
Moon.

(4) These rules may be subject to change if I fucked them up.
`

const section4 = `
(1) Participants are to be periodically added to the House Cup,
(2) Participants are to take the 16Personalities Test to determine their house, and may not switch
from that House prior to the date of the Strawberry Moon.
(3) Participants shall support their Houses in House Events, with at least one Participant being
present at each House Event.
(4) Participants must be registered to the House Cup on the House Cup Register in Schedule 1.
`

const section5 = `
(1) House Events—
    (a) Are to take place weekly, with no less than one House Event taking place per week.
    (b) Are to be decided by consensus of Participants, irrespective of Founders or House
    Captains.
    (c) May not take place on a Blood Moon.

(2) Failure to have at least one representative from your House at a House Event will result in lost
points in accordance with the Point System outlined in Part 2.
(3) These House Event rules do not limit the rules relating to Gambits outlined in section 12.
`

const section6 = `
(1) The following, agglutinated to the rules pertaining to the Revocation of House Points in section 7
are to be known as the Point System.

(2) House Points are awarded on the following rules
    (a) Winning a House Event results in 100 points.
    (b) Second place in a House Event results in 75 points.
    (c) Third place in a House Event results in 50 points.
    (d) Last place in a House Event results in 25 points.

(3) Bonus Points may be awarded on consensus of all four House Captains for doing Cool Shit.
(4) Bonus points may be awarded to houses in accordance with situations outlined in Part 4.
`

const section7 = `
(1) Points will be revoked from Houses in the following circumstances—
    (a) Failure to have one representative at a House Event will result in the loss of 50 points.
    (b) Establishment of any of the House Cup Crimes will result in a loss of points outlined in
    their respective sections.
    (c) Getting Buffaloed 3 times in one night will result in the loss of 10 points.
    (d) Getting How’s That’ed 3 times in one night will result in the loss of 50 points.
`

const section8 = `
(1) There is no prescribed mechanism of event selection, and;
    (a) Activity;
    (b) Date;
    (c) and Time; are to be decided by consensus.

(2) Events are to be advertised in the House Cup WhatsApp group.
(3) Any suggestions for future House Events are to be put into the WhatsApp group and/or noted
down for future reference.
`

const section9 = `
(1) Overthrowing Event Organisers by means of—
    (a) Treason
    (b) Bomb Threats
    (c) Magical Wishes and/or Spells
 is strictly prohibited, and establishes the actus reus for Treason under section 15.
`

const section10 = `
(1) Attempting to give Constructive Feedback also establishes the actus reus for Treason under
section 15.

(2) Anyone found giving Constructive Feedback shall be executed on the evening of the Strawberry
Moon without exception.
`

const section11 = `
(1) Bonus points will be awarded for attendance—
    (a) For each attending member at an event, the attending House will be awarded 1 point per
    person.
    (b) The points for attendance is limited in number to the number of people of the smallest
    house attending.
    (c) In order to get this point, the attending member must be dressed in their House colour or
    Trim, or have on hand any animal paraphernalia.

(2) At each indoor event, an attending Participant that shows exceptional House Pride through dress
or action will be awarded 5 points.
(3) At each outdoor event, the house that cheers the loudest will receive an additional 10 points.
(4) Contrary to the title of this section, no points will be awarded for being homosexual.
`

const section12 = `
(1) Gambits carry the definition outlined in section 1.
(2) Gambits abide by the following rules—
    (a) Gambits may be initiated if there is at least one representative from each house, and all
    Participants agree that the following activity will be a Gambit.
    (b) Participants may engage in a game of their choosing, awarding points in the following
    way:
        (i) Winner gets 20 points.
        (ii) Second gets 14 points.
        (iii) Third gets 10 Points.
        (iv) Last gets 4 Points.
    (c) Participants may only participate in one Gambit between each week.

(3) Gambits have the following limitations—
    (a) A Gambit is void if the status of the game as a Gambit is not established prior to the game
    being played.
    (b) A Gambit is void if there is not one representative of each House taking part.
    (c) A Gambit is void if any of the Participants has already taken part in another Gambit that
    week.
    (d) The week is defined from Monday to Sunday, and therefore a Participant who competed
    on Sunday, may compete the next day on the following Monday.

(4) Failure to abide by the Gambit rules will establish the actus reus for Cheating as defined in
section 15.
`

const section12a = `
(1) Super Gambits are hereby instated.
(2) The purpose of Super Gambits is to award higher player numbers in Gambit participation.
(3) Super Gambits are defined as having the same rules as Gambits but with the following alterations;
    (a) Super Gambits have a dynamic point totalling system, according to the minimum
    common number of participants from each house.
    (b) The point totalling system is hereby dictated by the following equation:
        (i) First place: (n x 20) points.
        (ii) Second Place: (n x 14) points
        (iii) Third Place (n x 10) points.
        (iv) Fourth Place (n x 4) points.

(4) Super Gambits’ point totalling system maxes out at 4 participants from each House, any increase
in number will not increase the total point value.
(5) Super Gambits must include active participation of all participants included in the dynamic point
totalling system count.
(6) Contrary to the rules on Gambits, Super Gambits may be performed twice a week per participant.
`

const section12b = `
(1) House Captains may declare an Armistice for Gambits or Super Gambits.
(2) An Armistice is defined as a temporary truce between two houses in order to compete in a Gambit
or Super Gambit, whether this be to claim the higher point amounts, or simply take part.
(3) An Armistice cannot be declared for any other reason other than competing in Gambits or Super
Gambits.
(4) Armistices can be composed of 2 or 3 Houses , however not 1 or 4.
(5) Contracting Parties to an Armistice will divide the resultant points 50:50.
`

const section13 = `
(1) It is hereby established and forbidden actions with the status of House Crimes.
(2) The proven establishment of a House Crime’s actus reus and mens rea, in the absence of defences
will attract punishment.
(3) Any attempted execution of any of the House Crimes will receive a punishment half that of the
full offence.
`

const section14 = `
(1) Any person who intentionally cheats, or diminishes the integrity of any House Event shall lose 30
points.

(2) The limitation period for cheating is the evening on which the event occurs at midnight.
(a) A cheater who makes it to midnight undetected is granted a full defence to the offence of
Cheating.
`

const section15 = `
(1) Any person who intentionally betrays their House, or aids/abets another House contrary to the
interests of their house will be deemed a Traitor, and shall be removed from their House.

(2) Any person found to have stopped treason shall be celebrated with fireworks every year on 5
November.

(3) Treason has no limitation period.
`

const section16 = `
(1) Public Nudity is highly discouraged.
(2) Any person who is documented naked in a public space will be awarded 30 points.
(3) Naked is defined as no fabricated items on at all.

Amendment of 4 April 2025

(4) The Crime of Public Nudity is hereby restricted as follows;
(a) Each participant may claim the points for public nudity once per half-semester.
(b) Public Nudity may not be performed in the same place twice, once a Participant has been
awarded points in a particular location, the place is henceforth disallowed.
(c) Any house with more than 10 members publicly nude in the same place at the same time
will receive 1000 house points.
`

const section17 = `
(1) Culpable homicide is murder in each of the following cases:
(a) if the offender means to cause the death of the person killed:
(b) if the offender means to cause to the person killed any bodily injury that is known to the
offender to be likely to cause death, and is reckless whether death ensues or not:
(c) if the offender means to cause death, or, being so reckless as aforesaid, means to cause such
bodily injury as aforesaid to one person, and by accident or mistake kills another person,
though he or she does not mean to hurt the person killed:
(d) if the offender for any unlawful object does an act that he or she knows to be likely to
cause death, and thereby kills any person, though he or she may have desired that his or
her object should be effected without hurting any one.

(2) There is no punishment for murder.
`

const section18 = `
(1) The three losing houses are to be executed by public hanging unless they successfully perform a
Yardie no later than one week after the date of the Strawberry Moon.

(2) Doing the Yardie is a full defence to the crime of Losing.
`

const section19 = `
(1) The following roles are also to be selected for each house—
(a) House Captain
    (i) Each House Captain is to be responsible for organising their House for any
    events.
    (ii) The House Captains are to be elected by the initial Founders.
    (iii) Until the finalisation of the House Cup Courts Act, the House Captains, in their
    collective presence, are final decision makers on any of the rules in this Act.

(b) Bursar
    (i) The Bursar will be responsible for accounting for the House Points of their
    house, as well as checking the House Points of the other Houses to ensure their
    validity.
    (ii) All four House Bursars will work together to correctly account for the points
    awarded and revoked during any House Events or Gambits.
    (iii) Bursars are to be elected by their House when at least a majority of members are
    present.
    (iv) Bursars in their collective capacity organise the allocation of jelly beans if a
    Participant chooses to convert their points. Bursars may not refuse to convert
    points.

Amendment of 4 April 2025

(c) House Judge
    (i) The House Judge is to be responsible for the following:
        1) Adjudicating on rules and interpretation of the House Cup Rules.
        2) Hearing cases brought to the House Cup Court about penalties, House
        Crimes and/or any other infraction.
    (ii) The House Judge is to be elected by democratic vote between the constituents of
    each House, in the presence of a Majority of Members.
    (iii) If the House Judges cannot come to a consensus on the interpretation of the rules,
    all Houses Party to the dispute will be docked 10 points. It is part of the Integrity
    of the Judges to ensure these points are removed accordingly.
    (iv) Only Judges from the House's party to a dispute may adjudicate on the dispute.

(2) After initial election, any person holding a role may abdicate that role, and a new role holder may
be elected out of the present Participant pool. Such an election must be conducted in the presence
of at least a majority of House Participants.

(3) More Roles may be added in the future.
(4) Each Participant may not hold more than one role.
`

const schedule1Text = `
The following natural persons are hereby Participants in the House Cup:

Name:           Signature:

House Captains:
________________________________________________________________  _____________
________________________________________________________________  _____________
________________________________________________________________  _____________
________________________________________________________________  _____________

Participants:
________________________________________________________________  _____________
________________________________________________________________  _____________
________________________________________________________________  _____________
________________________________________________________________  _____________
________________________________________________________________  _____________
________________________________________________________________  _____________
________________________________________________________________  _____________
________________________________________________________________  _____________
________________________________________________________________  _____________
________________________________________________________________  _____________
________________________________________________________________  _____________
________________________________________________________________  _____________
________________________________________________________________  _____________
________________________________________________________________  _____________
________________________________________________________________  _____________
________________________________________________________________  _____________
________________________________________________________________  _____________
________________________________________________________________  _____________
________________________________________________________________  _____________
________________________________________________________________  _____________
________________________________________________________________  _____________
________________________________________________________________  _____________
________________________________________________________________  _____________
________________________________________________________________  _____________
________________________________________________________________  _____________
________________________________________________________________  _____________

Assent of the House Captains:         Date:
`

export default HouseCupRulesPage