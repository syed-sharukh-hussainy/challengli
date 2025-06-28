export const ONBOARDING_SCREENS = [
  {
    title: "Level Up Your Life",
    imageUrl: "boarding1.png",
    description:
      "It takes 21 days to build a habit. Pick your challenge and start transforming your life today!"
  },
  {
    title: "Your Habit, Your Pace",
    imageUrl: "boarding2.png",
    description:
      "Shape your habits, your way. Start with a shorter challenge to ease into your journey, and when you're ready, commit to the 21-day challenge for lasting change."
  },
  {
    title: "Track & Stay Consistent",
    imageUrl: "onboarding33.png",
    description:
      "Check in daily, stay on track, and watch your habits grow stronger with each passing day."
  },
  {
    title: "Earn Rewards & Stay Motivated",
    imageUrl: "boarding4.png",
    description:
      "Gain XP, unlock achievements, and climb the leaderboard as you progress through your challenge."
  },
  {
    title: "Join a Supportive Community",
    imageUrl: "boarding5.png",
    description:
      "Connect with others, share progress, and stay inspired as you take on your 21-day journey."
  }

]
export const HOURS = [
  {
    value: 1,
    label: "01",
  },
  {
    value: 2,
    label: "02",
  },
  {
    value: 3,
    label: "03",
  },
  {
    value: 4,
    label: "04",
  },
  {
    value: 5,
    label: "05",
  },
  {
    value: 6,
    label: "06",
  },
  {
    value: 7,
    label: "07",
  },
  {
    value: 8,
    label: "08",
  },
  {
    value: 9,
    label: "09",
  },
  {
    value: 10,
    label: "10",
  },
  {
    value: 11,
    label: "11",
  },
  {
    value: 12,
    label: "12",
  },
]
export const MINUTES = Array.from({ length: 60 }, (_, i) => ({
  value: i,
  label: i.toString().padStart(2, "0"),
}))

export const PERIOD = [
  {
    value: 1,
    label: "AM",
  },
  {
    value: 2,
    label: "PM",
  },
]

export const ACHIEVEMENTS = [
  {
    id: "achievement-star",
    name: "Star",
    label: "STREAK_ACHIEVEMENT",
    imageUrl: "star.png",
    target: 3,
    xp: 3,
    share: "I earned the Star achievement by reaching a 3-day streak",
    earned: "You earned Star by reaching a 3-day streak",
    locked: "Reach 3-day streak to unlock this achievement",
  },
  {
    id: "achievement-superstar",
    name: "Superstar",
    label: "STREAK_ACHIEVEMENT",
    imageUrl: "superstar.png",
    target: 5,
    xp: 5,
    share: "I earned the Superstar achievement by reaching a 5-day streak",
    earned: "You earned Superstar by reaching a 5-day streak",
    locked: "Reach 5-day streak to unlock this achievement",
  },
  {
    id: "achievement-champion",
    name: "Champion",
    label: "STREAK_ACHIEVEMENT",
    imageUrl: "champion.png",
    target: 7,
    xp: 7,
    share: "I earned the Champion achievement by reaching a 7-day streak",
    earned: "You earned Champion by reaching a 7-day streak",
    locked: "Reach 7-day streak to unlock this achievement",
  },
  {
    id: "achievement-trailblazer",
    name: "Trailblazer",
    label: "STREAK_ACHIEVEMENT",
    imageUrl: "trailblazer.png",
    target: 14,
    xp: 14,
    share: "I earned the Trailblazer achievement by reaching a 14-day streak",
    earned: "You earned Trailblazer by reaching a 21-day streak",
    locked: "Reach 14-day streak to unlock this achievement",
  },
  {
    id: "achievement-hall-of-fame",
    name: "Hall of fame",
    label: "STREAK_ACHIEVEMENT",
    imageUrl: "hall-of-fame-new.png",
    target: 21,
    xp: 21,
    share: "I earned the Hall of fame achievement by reaching a 21-day streak",
    earned: "You earned Hall of fame by reaching a 21-day streak",
    locked: "Reach 21-day streak to unlock this achievement",
  },
  {
    id: "achievement-invincible",
    name: "Invincible",
    label: "STREAK_ACHIEVEMENT",
    imageUrl: "invincible-new.png",
    target: 100,
    xp: 100,
    share: "I earned the Invincible achievement by reaching a 100-day streak",
    earned: "You earned Invincible by reaching a 100-day streak",
    locked: "Reach 100-day streak to unlock this achievement",
  },
  {
    id: "achievement-legend",
    name: "Legend",
    label: "STREAK_ACHIEVEMENT",
    imageUrl: "legend.png",
    target: 150,
    xp: 150,
    share: "I earned the Legend achievement by reaching a 150-day streak",
    earned: "You earned Legend by reaching a 150-day streak",
    locked: "Reach 150-day streak to unlock this achievement",
  },
  {
    id: "achievement-eternal",
    name: "Eternal",
    label: "STREAK_ACHIEVEMENT",
    imageUrl: "eternal-new.png",
    target: 200,
    xp: 200,
    share: "I earned the Eternal achievement by reaching a 200-day streak",
    earned: "You earned Eternal by reaching a 200-day streak",
    locked: "Reach 200-day streak to unlock this achievement",
  },
  {
    id: "achievement-enduring-spirit",
    name: "Enduring Spirit",
    label: "STREAK_ACHIEVEMENT",
    imageUrl: "enduring-spirit.png",
    target: 250,
    xp: 250,
    share: "I earned the Enduring Spirit achievement by reaching a 250-day streak",
    earned: "You earned Enduring Spirit by reaching a 250-day streak",
    locked: "Reach 250-day streak to unlock this achievement",
  },
  {
    id: "achievement-unbreakable",
    name: "Unbreakable",
    label: "STREAK_ACHIEVEMENT",
    imageUrl: "shield.png",
    target: 300,
    xp: 300,
    share: "I earned the Unbreakable achievement by reaching a 300-day streak",
    earned: "You earned Unbreakable by reaching a 300-day streak",
    locked: "Reach 300-day streak to unlock this achievement",
  },
  {
    id: "achievement-imperial",
    name: "Imperial",
    label: "STREAK_ACHIEVEMENT",
    imageUrl: "Imperial.png",
    target: 500,
    xp: 500,
    share: "I earned the Imperial achievement by reaching a 500-day streak",
    earned: "You earned Imperial by reaching a 500-day streak",
    locked: "Reach 500-day streak to unlock this achievement",
  },
  {
    id: "achievement-the-ultimate",
    name: "The Ultimate",
    label: "STREAK_ACHIEVEMENT",
    imageUrl: "the-ultimate.png",
    target: 1000,
    xp: 1000,
    share: "I earned the The Ultimate achievement by reaching a 1000-day streak",
    earned: "You earned The Ultimate by reaching a 1000-day streak",
    locked: "Reach 1000-day streak to unlock this achievement",
  },
  {
    id: "achievement-rising-star",
    name: "Rising Star",
    label: "XP_ACHIEVEMENT",
    imageUrl: "rising-star.png",
    target: 100,
    xp: 10,
    share: "I earned the Rising Star achievement by gaining 100XP!",
    earned: "You earned Rising Star by gaining 100 XP!",
    locked: "Earn 100 XP to unlock this achievement",
  },
  {
    id: "achievement-pathfinder",
    name: "Pathfinder",
    label: "XP_ACHIEVEMENT",
    imageUrl: "pathfinder.png",
    target: 500,
    xp: 50,
    share: "I earned the Pathfinder achievement by gaining 500 XP!",
    earned: "You earned Pathfinder by gaining 500 XP!",
    locked: "Earn 500 XP to unlock this achievement",
  },
  {
    id: "achievement-milestone-maker",
    name: "Milestone Maker",
    label: "XP_ACHIEVEMENT",
    imageUrl: "milestone-maker.png",
    target: 1000,
    xp: 100,
    share: "I earned the Milestone Maker achievement by gaining 500 XP!",
    earned: "You earned Milestone Maker by gaining 1000 XP!",
    locked: "Earn 1000 XP to unlock this achievement",
  },
  {
    id: "achievement-momentum-master",
    name: "Momentum Master",
    label: "XP_ACHIEVEMENT",
    imageUrl: "momentum-master.png",
    target: 2000,
    xp: 200,
    share: "I earned the Momentum Master achievement by gaining 2000 XP!",
    earned: "You earned Momentum Master by gaining 2000 XP!",
    locked: "Earn 2000 XP to unlock this achievement",
  },
  {
    id: "achievement-xp-explorer",
    name: "XP Explorer",
    label: "XP_ACHIEVEMENT",
    imageUrl: "xp-explorer.png",
    target: 5000,
    xp: 500,
    share: "I earned the XP Explorer achievement by gaining 5000 XP!",
    earned: "You earned XP Explorer by gaining 5000 XP!",
    locked: "Earn 5000 XP to unlock this achievement",
  },
  {
    id: "achievement-level-up-star",
    name: "Level Up Star",
    label: "XP_ACHIEVEMENT",
    imageUrl: "level-up-star.png",
    target: 10000,
    xp: 1000,
    share: "I earned the Level Up Star achievement by gaining 10000 XP!",
    earned: "You earned Level Up Star by gaining 10000 XP!",
    locked: "Earn 10000 XP to unlock this achievement",
  },
  {
    id: "achievement-xp-commander",
    name: "XP Commander",
    label: "XP_ACHIEVEMENT",
    imageUrl: "xp-commander.png",
    target: 15000,
    xp: 1500,
    share: "I earned the XP Commander achievement by gaining 15000 XP!",
    earned: "You earned XP Commander by gaining 15000 XP!",
    locked: "Earn 15000 XP to unlock this achievement",
  },
  {
    id: "achievement-elite-achiever",
    name: "Elite Achiever",
    label: "XP_ACHIEVEMENT",
    imageUrl: "elite-achiever.png",
    target: 20000,
    xp: 2000,
    share: "I earned the Elite Achiever achievement by gaining 20000 XP!",
    earned: "You earned Elite Achiever by gaining 20000 XP!",
    locked: "Earn 20000 XP to unlock this achievement",
  },
  {
    id: "achievement-everlasting-energy",
    name: "Everlasting Energy",
    label: "XP_ACHIEVEMENT",
    imageUrl: "everlasting-energy.png",
    target: 30000,
    xp: 3000,
    share: "I earned the Everlasting Energy achievement by gaining 30000 XP!",
    earned: "You earned Everlasting Energy by gaining 30000 XP!",
    locked: "Earn 30000 XP to unlock this achievement",
  },
  {
    id: "achievement-legendary-achiever",
    name: "Legendary Achiever",
    label: "XP_ACHIEVEMENT",
    imageUrl: "legendary-achiever.png",
    target: 50000,
    xp: 5000,
    share: "I earned the Legendary Achiever achievement!",
    earned: "You earned Legendary Achiever by gaining 50000 XP!",
    locked: "Earn 50000 XP to unlock this achievement",
  },

  // CHALLENGE_ACHIEVEMENT
  {
    id: "achievement-first-step",
    name: "First Step",
    label: "CHALLENGE_ACHIEVEMENT",
    imageUrl: "first-step.png",
    target: 1,
    xp: 10,
    share: "I earned the First Step achievement by completing 1 challenge!",
    earned: "You earned First Step by completing 1 challenge",
    locked: "Complete 1 challenge to unlock this achievement",
  },
  {
    id: "achievement-goal-igniter",
    name: "Goal Igniter",
    label: "CHALLENGE_ACHIEVEMENT",
    imageUrl: "goal-igniter.png",
    target: 5,
    xp: 50,
    share: "I earned the Mission Adventurer achievement by completing 5 challenge!",
    earned: "You earned Mission Adventurer by completing 5 challenges",
    locked: "Complete 5 challenges to unlock this achievement",
  },
  {
    id: "achievement-mission-adventurer",
    name: "Mission Adventurer",
    label: "CHALLENGE_ACHIEVEMENT",
    imageUrl: "mission-adventurer.png",
    target: 10,
    xp: 100,
    share: "I earned the Mission Adventurer achievement by completing 10 challenges!",
    earned: "You earned Mission Adventurer by completing 10 challenges",
    locked: "Complete 10 challenges to unlock this achievement",
  },
  {
    id: "achievement-unyielding-warrior",
    name: "Unyielding Warrior",
    label: "CHALLENGE_ACHIEVEMENT",
    imageUrl: "unyielding-warrior.png",
    target: 15,
    xp: 150,
    share: "I earned the Unyielding Warrior achievement by completing 15 challenges!",
    earned: "You earned Unyielding Warrior by completing 15 challenges",
    locked: "Complete 15 challenges to unlock this achievement",
  },
  {
    id: "achievement-way-finder",
    name: "Wayfinder",
    label: "CHALLENGE_ACHIEVEMENT",
    imageUrl: "wayfinder.png",
    target: 20,
    xp: 200,
    share: "I earned the Wayfinder achievement by completing 20 challenges!",
    earned: "You earned Wayfinder by completing 20 challenges.",
    locked: "Complete 20 challenges to unlock this achievement",
  },
  {
    id: "achievement-halfway-hero",
    name: "Halfway Hero",
    label: "CHALLENGE_ACHIEVEMENT",
    imageUrl: "halfway-hero.png",
    target: 25,
    xp: 250,
    share: "I earned the Halfway Hero achievement by completing 25 challenges!",
    earned: "You earned Halfway Hero by completing 25 challenges",
    locked: "Complete 25 challenges to unlock this achievement",
  },
  {
    id: "achievement-achievement-spark",
    name: "Achievement Spark",
    label: "CHALLENGE_ACHIEVEMENT",
    imageUrl: "achievement-spark.png",
    target: 30,
    xp: 300,
    share: "I earned the Achievement Spark achievement by completing 30 challenges!",
    earned: "You earned Achievement Spark by completing 30 challenges",
    locked: "Complete 30 challenges to unlock this achievement",
  },
  {
    id: "achievement-wellness-wizard",
    name: "Wellness Wizard",
    label: "CHALLENGE_ACHIEVEMENT",
    imageUrl: "wellness-wizard.png",
    target: 35,
    xp: 350,
    share: "I earned the Wellness Wizard achievement by completing 35 challenges!",
    earned: "You earned Wellness Wizard by completing 35 challenges",
    locked: "Complete 1 challenge to unlock this achievement",
  },
  {
    id: "achievement-challenge-king",
    name: "Challenge king",
    label: "CHALLENGE_ACHIEVEMENT",
    imageUrl: "challenge-king.png",
    target: 40,
    xp: 400,
    share: "I earned the Challenge king achievement by completing 40 challenges!",
    earned: "You earned Challenge king by completing 40 challenges",
    locked: "Complete 40 challenges to unlock this achievement",
  },
  {
    id: "achievement-ultimate-achiever",
    name: "Ultimate Achiever",
    label: "CHALLENGE_ACHIEVEMENT",
    imageUrl: "ultimate-achiever.png",
    target: 45,
    xp: 450,
    share: "I earned the Ultimate Achiever achievement by completing 45 challenges!",
    earned: "You earned Ultimate Achiever by completing 45 challenges",
    locked: "Complete 45 challenges to unlock this achievement",
  },
  {
    id: "achievement-master-of-transformation",
    name: "Master of Transformation",
    label: "CHALLENGE_ACHIEVEMENT",
    imageUrl: "master-of-transformation.png",
    target: 50,
    xp: 500,
    share: "I earned the Master of Transformation achievement by completing 50 challenges!",
    earned: "You earned Master of Transformation by completing 50 challenges.",
    locked: "Complete 50 challenges to unlock this achievement",
  },
]

export const IMAGES = [
  {
    name: 'Achievement Spark',
    key: "achievement-spark.png"
  },
  {
    name: 'Achievement Spark',
    key: "achievement-spark.png"
  },
  {
    name: 'Achievement Spark',
    key: "achievement-spark.png"
  },
  {
    name: 'Achievement Spark',
    key: "achievement-spark.png"
  }, {
    name: 'Achievement Spark',
    key: "achievement-spark.png"
  },
  {
    name: 'Achievement Spark',
    key: "achievement-spark.png"
  },
  {
    name: 'Achievement Spark',
    key: "achievement-spark.png"
  },
  {
    name: 'Achievement Spark',
    key: "achievement-spark.png"
  },
  {
    name: 'Achievement Spark',
    key: "achievement-spark.png"
  }, {
    name: 'Achievement Spark',
    key: "achievement-spark.png"
  },
  {
    name: 'Achievement Spark',
    key: "achievement-spark.png"
  },
  {
    name: 'Achievement Spark',
    key: "achievement-spark.png"
  },
  {
    name: 'Achievement Spark',
    key: "achievement-spark.png"
  },
  {
    name: 'Achievement Spark',
    key: "achievement-spark.png"
  }, {
    name: 'Achievement Spark',
    key: "achievement-spark.png"
  },
  {
    name: 'Achievement Spark',
    key: "achievement-spark.png"
  }, {
    name: 'Achievement Spark',
    key: "achievement-spark.png"
  },
  {
    name: 'Achievement Spark',
    key: "achievement-spark.png"
  },
  {
    name: 'Achievement Spark',
    key: "achievement-spark.png"
  },
  {
    name: 'Achievement Spark',
    key: "achievement-spark.png"
  },
  {
    name: 'Achievement Spark',
    key: "achievement-spark.png"
  }, {
    name: 'Achievement Spark',
    key: "achievement-spark.png"
  }
]

export const NEW_CHALLENGE_IMAGES = [
  {
    title: 'education',
    data: [
      {
        name: "paint",
        key: "paint.png"
      },
      {
        name: "sharpener",
        key: "sharpener.png"
      },
      {
        name: "compass",
        key: "compass.png"
      },
      {
        name: "color-pencils",
        key: "color-pencils.png"
      },
      {
        name: "chemistry",
        key: "chemistry.png"
      },
      {
        name: "school-bag",
        key: "school-bag.png"
      },
      {
        name: "folder",
        key: "folder.png"
      },
      {
        name: "math",
        key: "math.png"
      },
      {
        name: "books",
        key: "books.png"
      },
      {
        name: "notebook",
        key: "notebook.png"
      },
    ]
  },
  {
    title: 'productivity',
    data: [
      {
        name: "alarm-productivity",
        key: "alarm-productivity.png"
      },
      {
        name: "bag-productivity",
        key: "bag-productivity.png"
      },
      {
        name: "bell-productivity",
        key: "bell-productivity.png"
      },
      {
        name: "book-productivity",
        key: "book-productivity.png"
      },
      {
        name: "brainstorming-productivity",
        key: "brainstorming-productivity.png"
      },
      {
        name: "briefcase-productivity",
        key: "briefcase-productivity.png"
      },
      {
        name: "calendar-new-productivity",
        key: "calendar-new-productivity.png"
      },
      {
        name: "calendar-productivity",
        key: "calendar-productivity.png"
      },
      {
        name: "checkboxes-productivity",
        key: "checkboxes-productivity.png"
      },
      {
        name: "check-list-productivity",
        key: "check-list-productivity.png"
      },
      {
        name: "fire-alarm-productivity",
        key: "fire-alarm-productivity.png"
      },
      {
        name: "hourglass-productivity",
        key: "hourglass-productivity.png"
      },
      {
        name: "notes-productivity",
        key: "notes-productivity.png"
      },
      {
        name: "sand-productivity",
        key: "sand-productivity.png"
      },
      {
        name: "time-management-productivity",
        key: "time-management-productivity.png"
      },
    ]
  },
  {
    title: 'Mindfulness & Wellness',
    data: [
      {
        name: "candle-mindfulness",
        key: "candle-mindfulness.png"
      },
      {
        name: "candles-mindfulness",
        key: "candles-mindfulness.png"
      },
      {
        name: "lotus-flower-mindfulness",
        key: "lotus-flower-mindfulness.png"
      },
      {
        name: "beauty-mindfulness",
        key: "beauty-mindfulness.png"
      },
      {
        name: "breathing-mindfulness",
        key: "breathing-mindfulness.png"
      },
      {
        name: "incense-mindfulness",
        key: "incense-mindfulness.png"
      },
      {
        name: "lotus-mindfulness",
        key: "lotus-mindfulness.png"
      },
      {
        name: "magic-ball-mindfulness",
        key: "magic-ball-mindfulness.png"
      },
      {
        name: "mindfulness-mindfulness",
        key: "mindfulness-mindfulness.png"
      },
      {
        name: "namaste-mindfulness",
        key: "namaste-mindfulness.png"
      },
      {
        name: "physics-mindfulness",
        key: "physics-mindfulness.png"
      },
      {
        name: "spa-mindfulness",
        key: "spa-mindfulness.png"
      },
      {
        name: "spa-new-mindfulness",
        key: "spa-new-mindfulness.png"
      },
      {
        name: "sprout-mindfulness",
        key: "sprout-mindfulness.png"
      },
      {
        name: "yin-yang-mindfulness",
        key: "yin-yang-mindfulness.png"
      },
    ]
  },
  {
    title: 'fitness',
    data: [
      {
        name: "gymnastic-rings",
        key: "gymnastic-rings.png"
      },
      {
        name: "hand-grip",
        key: "hand-grip.png"
      },
      {
        name: "kettlebells",
        key: "kettlebells.png"
      },
      {
        name: "punching-bag",
        key: "punching-bag.png"
      },
      {
        name: "stationary-bike",
        key: "stationary-bike.png"
      },
      {
        name: "dumbbell-heavy",
        key: "dumbbell-heavy.png"
      },
      {
        name: "chest-expander",
        key: "chest-expander.png"
      },
      {
        name: "barbell",
        key: "barbell.png"
      },
      {
        name: "boxing-glove",
        key: "boxing-glove.png"
      },
      {
        name: "running",
        key: "running.png"
      },

      {
        name: "dumbbell",
        key: "dumbbell.png"
      },
      {
        name: "push-up-bar",
        key: "push-up-bar.png"
      },
      {
        name: "rings",
        key: "rings.png"
      },
      {
        name: "resistance-band",
        key: "resistance-band.png"
      },
      {
        name: "skipping-rope",
        key: "skipping-rope.png"
      },
      {
        name: "excercise",
        key: "excercise.png"
      },
    ]

  },
  {
    title: 'sports',
    data: [
      {
        name: "sports-badminton",
        key: "sports-badminton.png"
      },
      {
        name: "sports-foam",
        key: "sports-foam.png"
      },
      {
        name: "sports-basketball",
        key: "sports-basketball.png"
      },
      {
        name: "sports-cricket",
        key: "sports-cricket.png"
      },
      {
        name: "sports-cycling",
        key: "sports-cycling.png"
      },
      {
        name: "sports-footbal",
        key: "sports-footbal.png"
      },
      {
        name: "sports-hiking",
        key: "sports-hiking.png"
      },
      {
        name: "sports-martial-arts",
        key: "sports-martial-arts.png"
      },
      {
        name: "sports-runner",
        key: "sports-runner.png"
      },
      {
        name: "sports-skating",
        key: "sports-skating.png"
      },
      {
        name: "sports-softball",
        key: "sports-softball.png"
      },
      {
        name: "sports-swimmer",
        key: "sports-swimmer.png"
      },
      {
        name: "sports-table-tennis",
        key: "sports-table-tennis.png"
      },
      {
        name: "sports-tennis",
        key: "sports-tennis.png"
      },
      {
        name: "sports-volleyball",
        key: "sports-volleyball.png"
      },
    ]
  },
  {
    title: 'activities',
    data: [
      {
        name: "gardening-activities",
        key: "gardening-activities.png"
      },
      {
        name: "picnic-table-activities",
        key: "picnic-table-activities.png"
      },
      {
        name: "pop-corn-activities",
        key: "pop-corn-activities.png"
      },
      {
        name: "game-control-activities",
        key: "game-control-activities.png"
      },
      {
        name: "pawn-chess-activities",
        key: "pawn-chess-activities.png"
      },
      {
        name: "pawn-activities",
        key: "pawn-activities.png"
      },
      {
        name: "dices-activities",
        key: "dices-activities.png"
      },
      {
        name: "star-activities",
        key: "star-activities.png"
      },
      {
        name: "puzzle-activities",
        key: "puzzle-activities.png"
      },
      {
        name: "canoe-activities",
        key: "canoe-activities.png"
      },
      {
        name: "telescope-activities",
        key: "telescope-activities.png"
      },
      {
        name: "fishing-activities",
        key: "fishing-activities.png"
      },
      {
        name: "singing-activities",
        key: "singing-activities.png"
      },
      {
        name: "music-note-activities",
        key: "music-note-activities.png"
      },
      {
        name: "photography-activities",
        key: "photography-activities.png"
      },
      {
        name: "watercolor-activities",
        key: "watercolor-activities.png"
      },
      {
        name: "theater-masks-activities",
        key: "theater-masks-activities.png"
      },
    ]
  },
  {
    title: 'food and beverages',
    data: [
      {
        name: "food-chicken-soup",
        key: "food-chicken-soup.png"
      },
      {
        name: "food-coconut-drink",
        key: "food-coconut-drink.png"
      },
      {
        name: "food-mulled-wine",
        key: "food-mulled-wine.png"
      },
      {
        name: "food-juice",
        key: "food-juice.png"
      },
      {
        name: "food-cocktail-drink",
        key: "food-cocktail-drink.png"
      },
      {
        name: "food-smoothie",
        key: "food-smoothie.png"
      },
      {
        name: "non-food-alcoholic",
        key: "non-food-alcoholic.png"
      },
      {
        name: "food-cocktail",
        key: "food-cocktail.png"
      },
      {
        name: "milk-food-tea",
        key: "milk-food-tea.png"
      },
      {
        name: "food-champagne",
        key: "food-champagne.png"
      },
      {
        name: "food-drinks",
        key: "food-drinks.png"
      },
      {
        name: "food-carrot",
        key: "food-carrot.png"
      },
      {
        name: "food-vegetable",
        key: "food-vegetable.png"
      },
      {
        name: "food-vegetables",
        key: "food-vegetables.png"
      },
      {
        name: "food-pizza",
        key: "food-pizza.png"
      },
      {
        name: "food-thali",
        key: "food-thali.png"
      },
      {
        name: "finger-food",
        key: "finger-food.png"
      },
      {
        name: "food-lunch",
        key: "food-lunch.png"
      },
      {
        name: "food-bibimbap",
        key: "food-bibimbap.png"
      },
      {
        name: "food-dish",
        key: "food-dish.png"
      },
    ]
  },
  {
    title: 'Art',
    data: [
      {
        name: "art-calligraphy",
        key: "art-calligraphy.png"
      },
      {
        name: "art-paint",
        key: "art-paint.png"
      },
      {
        name: "art-pottery",
        key: "art-pottery.png"
      },
      {
        name: "art-graffiti",
        key: "art-graffiti.png"
      },
      {
        name: "arrt-modern-art",
        key: "arrt-modern-art.png"
      },
      {
        name: "art-paint-palette",
        key: "art-paint-palette.png"
      },
      {
        name: "art-digital-art",
        key: "art-digital-art.png"
      },
      {
        name: "art-brush",
        key: "art-brush.png"
      },
      {
        name: "art-pantone",
        key: "art-pantone.png"
      },
      {
        name: "art-art-2",
        key: "art-art-2.png"
      },
    ]
  },
  {
    title: 'financial',
    data: [
      {
        name: "accounting-financial",
        key: "accounting-financial.png"
      },
      {
        name: "budget-financial",
        key: "budget-financial.png"
      },
      {
        name: "budget-new-financial",
        key: "budget-new-financial.png"
      },
      {
        name: "funnel-financial",
        key: "funnel-financial.png"
      },
      {
        name: "money-financial",
        key: "money-financial.png"
      },
      {
        name: "presentation-financial",
        key: "presentation-financial.png"
      },
      {
        name: "safe-box-financial",
        key: "safe-box-financial.png"
      },
      {
        name: "statistics-financial",
        key: "statistics-financial.png"
      },
      {
        name: "strategy-financial",
        key: "strategy-financial.png"
      },
      {
        name: "traveling-financial",
        key: "traveling-financial.png"
      },
    ]
  },
  {
    title: 'miscellaneous',
    data: [
      {
        name: "brick-miscellaneous",
        key: "brick-miscellaneous.png"
      },
      {
        name: "balloons-miscellaneous",
        key: "balloons-miscellaneous.png"
      },
      {
        name: "world-miscellaneous",
        key: "world-miscellaneous.png"
      },
      {
        name: "test-tubes-miscellaneous",
        key: "test-tubes-miscellaneous.png"
      },
      {
        name: "target-new-miscellaneous",
        key: "target-new-miscellaneous.png"
      },
      {
        name: "target-miscellaneous",
        key: "target-miscellaneous.png"
      },
      {
        name: "infinity-miscellaneous",
        key: "infinity-miscellaneous.png"
      },
      {
        name: "gift-box-miscellaneous",
        key: "gift-box-miscellaneous.png"
      },
      {
        name: "dice-miscellaneous",
        key: "dice-miscellaneous.png"
      },
      {
        name: "dart-board-miscellaneous",
        key: "dart-board-miscellaneous.png"
      },
      {
        name: "box-miscellaneous",
        key: "box-miscellaneous.png"
      },
      {
        name: "globe-miscellaneous",
        key: "globe-miscellaneous.png"
      },
      {
        name: "package-miscellaneous",
        key: "package-miscellaneous.png"
      },
      {
        name: "refresh-miscellaneous",
        key: "refresh-miscellaneous.png"
      },
      {
        name: "test-tube-miscellaneous",
        key: "test-tube-miscellaneous.png"
      },
      {
        name: "arrow-miscellaneous",
        key: "arrow-miscellaneous.png"
      },
      {
        name: "balloon-miscellaneous",
        key: "balloon-miscellaneous.png"
      },
      {
        name: "board-game-miscellaneous",
        key: "board-game-miscellaneous.png"
      },
      {
        name: "bricks-miscellaneous",
        key: "bricks-miscellaneous.png"
      },
      {
        name: "chemical-miscellaneous",
        key: "chemical-miscellaneous.png"
      },
      {
        name: "test-miscellaneous",
        key: "test-miscellaneous.png"
      },
      {
        name: "calendar-miscellaneous",
        key: "calendar-miscellaneous.png"
      },
      {
        name: "checkboxes-miscellaneous",
        key: "checkboxes-miscellaneous.png"
      },
      {
        name: "check-list-miscellaneous",
        key: "check-list-miscellaneous.png"
      },
      {
        name: "compass-news-miscellaneous",
        key: "compass-news-miscellaneous.png"
      },
      {
        name: "family-miscellaneous",
        key: "family-miscellaneous.png"
      },
      {
        name: "graphic-tool-miscellaneous",
        key: "graphic-tool-miscellaneous.png"
      },
      {
        name: "magic-lamp-miscellaneous",
        key: "magic-lamp-miscellaneous.png"
      },
      {
        name: "turn-off-miscellaneous",
        key: "turn-off-miscellaneous.png"
      },
      {
        name: "vinyl-miscellaneous",
        key: "vinyl-miscellaneous.png"
      },
      {
        name: "calendar-food-miscellaneous",
        key: "calendar-food-miscellaneous.png"
      },
      {
        name: "cube-miscellaneous",
        key: "cube-miscellaneous.png"
      },
      {
        name: "cubes-miscellaneous",
        key: "cubes-miscellaneous.png"
      },
      {
        name: "desk-lamp-miscellaneous",
        key: "desk-lamp-miscellaneous.png"
      },
      {
        name: "gamepad-miscellaneous",
        key: "gamepad-miscellaneous.png"
      },
      {
        name: "garland-miscellaneous",
        key: "garland-miscellaneous.png"
      },
      {
        name: "joystick-miscellaneous",
        key: "joystick-miscellaneous.png"
      },
      {
        name: "lock-miscellaneous",
        key: "lock-miscellaneous.png"
      },
      {
        name: "padlock-miscellaneous",
        key: "padlock-miscellaneous.png"
      },
      {
        name: "rubik-miscellaneous",
        key: "rubik-miscellaneous.png"
      },
      {
        name: "calendar-new-miscellaneous",
        key: "calendar-new-miscellaneous.png"
      },
      {
        name: "compass-miscellaneous",
        key: "compass-miscellaneous.png"
      },
      {
        name: "compass-new-miscellaneous",
        key: "compass-new-miscellaneous.png"
      },
      {
        name: "light-bulb-miscellaneous",
        key: "light-bulb-miscellaneous.png"
      },
      {
        name: "light-miscellaneous",
        key: "light-miscellaneous.png"
      },
      {
        name: "timer-miscellaneous",
        key: "timer-miscellaneous.png"
      },
      {
        name: "tools-miscellaneous",
        key: "tools-miscellaneous.png"
      },
      {
        name: "triskele-miscellaneous",
        key: "triskele-miscellaneous.png"
      },
      {
        name: "alarm-clock-miscellaneous",
        key: "alarm-clock-miscellaneous.png"
      },
      {
        name: "blocks-miscellaneous",
        key: "blocks-miscellaneous.png"
      },
    ]
  }
]

export const COLORS = [
  {
    primary: "#ef5350",
    secondary: "#ffebee",
  },
  {
    primary: "#ec407a",
    secondary: "#fce4ec",
  },
  {
    primary: "#ab47bc",
    secondary: "#f3e5f5",
  },
  {
    primary: "#7e57c2",
    secondary: "#ede7f6",
  },
  {
    primary: "#5c6bc0",
    secondary: "#e8eaf6",
  },
  {
    primary: "#42a5f5",
    secondary: "#e3f2fd",
  },
  {
    primary: "#29b6f6",
    secondary: "#e1f5fe",
  },
  {
    primary: "#26c6da",
    secondary: "#e0f7fa",
  },
  {
    primary: "#26a69a",
    secondary: "#e0f2f1",
  },
  {
    primary: "#66bb6a",
    secondary: "#e8f5e9",
  },

  {
    primary: "#9ccc65",
    secondary: "#f1f8e9",
  },
  {
    primary: "#d4e157",
    secondary: "#f9fbe7",
  },
  {
    primary: "#ffee58",
    secondary: "#fffde7",
  },
  {
    primary: "#26c6da",
    secondary: "#e0f7fa",
  },
  {
    primary: "#ffca28",
    secondary: "#fff8e1",
  },
  {
    primary: "#ffa726",
    secondary: "#fff3e0",
  },
]


