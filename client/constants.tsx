import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import Foundation from '@expo/vector-icons/Foundation';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export const ACTIVE_COLOR = "#074979"
export const INACTIVE_COLOR = "#0078cf"
export const API_URL = "http://192.168.100.17:8000/"

export const tabs = [
    {title: "Home", iconName: "home", IconFrom: Entypo},
    {title: "Authorities", iconName: "local-police", IconFrom: MaterialIcons},
    {title: "Announcements", iconName: "announcement", IconFrom: MaterialIcons},
]

export const contactsTabs = [
    {title: "Family", iconName: "family-restroom", IconFrom: MaterialIcons},
    {title: "Responders", iconName: "guy-fawkes-mask", IconFrom: MaterialCommunityIcons},
]


export const homeTabs = [
    {iconName: "notifications-outline", IconFrom: Ionicons},
    {iconName: "first-aid", IconFrom: Foundation},
    {iconName: "sos", IconFrom: MaterialIcons},
]



export const firstAidOptions = [
    {title: "Anaphylaxis", 
        icon: require("@/assets/images/firstaid_icons/dermatitis.png"),
    content: [
        {title: "When to seek emergency help", subtitle: "1", content: "If you're with someone having an allergic reaction with signs of anaphylaxis, call 911 or your local medical emergency number right away."},
        {title: "", subtitle: "2", content: "Don't wait to see whether symptoms get better. Seek emergency treatment right away. Severe untreated anaphylaxis can lead to death within half an hour."},
        {title: "", subtitle: "3", content: "Get emergency treatment even if symptoms start to improve. After anaphylaxis, it's possible for symptoms to start again. Being watched in a hospital for several hours most often is needed."},


        {title: "Symptoms", subtitle: "1", content: "Skin reactions, including hives, itching, and skin that becomes flushed or changes color."},
        {title: "", subtitle: "2", content: "Swelling of the face, eyes, lips or throat."},
        {title: "", subtitle: "3", content: "Narrowing of the airways, leading to wheezing and trouble breathing or swallowing."},
        {title: "", subtitle: "4", content: "A weak and rapid pulse."},
        {title: "", subtitle: "5", content: "Nausea, vomiting or diarrhea."},
        {title: "", subtitle: "6", content: "Dizziness, fainting or unconsciousness."},


        {title: "Treatment", subtitle: "1", content: "Call 911 or your local medical emergency number right away."},
        {title: "", subtitle: "2", content: "Ask if the person is carrying an epinephrine autoinjector (EpiPen, Auvi-Q, others) to treat an allergic attack."},
        {title: "", subtitle: "3", content: "If the person needs to use an autoinjector, ask whether you should help inject the medicine. This most often is done by pressing the autoinjector against the person's thigh."},
        {title: "", subtitle: "4", content: "Have the person lie face up and be still."},
        {title: "", subtitle: "5", content: "Loosen tight clothing and cover the person with a blanket."},
        {title: "", subtitle: "6", content: "If there's vomiting or bleeding from the mouth, turn the person to the side to prevent choking."},
        {title: "", subtitle: "7", content: "If there are no signs of breathing, coughing or movement, begin CPR. Keep doing about 100 chest presses every minute until paramedics arrive."},
    
    
    ]
    },

    {title: "Burns", 
        icon: require("@/assets/images/firstaid_icons/burn.png"),

    content: [
        {title: "When to seek emergency help", subtitle: "1", content: "May be deep, involving all layers of the skin."},
        {title: "", subtitle: "2", content: "May cause the skin to be dry and leathery."},
        {title: "", subtitle: "3", content: "May appear charred or have patches of white, brown or black."},
        {title: "", subtitle: "4", content: "Are larger than 3 inches (about 8 centimeters) in diameter."},
        {title: "", subtitle: "5", content: "Cover the hands, feet, face, groin, buttocks or a major joint, or encircle an arm or a leg."},
        {title: "", subtitle: "6", content: "Are accompanied by smoke inhalation."},
        {title: "", subtitle: "7", content: "Begin swelling very quickly."},


        {title: "Treatment - Major Burn", subtitle: "1", content: "Protect the burned person from further harm. If you can do so safely, make sure the person you're helping is not in contact with the source of the burn. For electrical burns, make sure the power source is off before you approach the burned person."},
        {title: "", subtitle: "2", content: "Make certain that burned person is breathing. If needed, begin rescue breathing if you know how."},
        {title: "", subtitle: "3", content: "Remove jewelry, belts and other tight items, especially from the burned area and the neck. Burned areas swell quickly."},
        {title: "", subtitle: "4", content: "Cover the burn. Loosely cover the area with gauze or a clean cloth."},
        {title: "", subtitle: "5", content: "Raise the burned area. Lift the wound above heart level if possible."},
        {title: "", subtitle: "6", content: "Watch for symptoms of shock. Symptoms include cool, clammy skin, weak pulse and shallow breathing."},
    
        
        {title: "Treatment - Minor Burn", subtitle: "1", content: "Cool the burn. Hold the area under cool — not cold — running water for about 10 minutes. If this isn't possible or if the burn is on the face, apply a cool, wet cloth until the pain eases. For a mouth burn from hot food or drink, put a piece of ice in the mouth for a few minutes."},
        {title: "", subtitle: "2", content: "Remove rings or other tight items. Try to do this quickly and gently, before the burned area swells."},
        {title: "", subtitle: "3", content: "Apply lotion. After the burn is cooled, apply a lotion, such as one with aloe vera or cocoa butter. This helps prevent drying."},
        {title: "", subtitle: "4", content: "Bandage the burn. Cover the burn with a clean bandage. Wrap it loosely to avoid putting pressure on burned skin. Bandaging keeps air off the area, reduces pain and protects blistered skin."},
        {title: "", subtitle: "5", content: "If needed, take a nonprescription pain reliever, such as ibuprofen (Advil, Motrin IB, others) or acetaminophen (Tylenol, others)."},
    
    
    ]
    },




    {title: "Choking", 
        icon: require("@/assets/images/firstaid_icons/person.png"),

    content: [
        {title: "When to seek emergency help", subtitle: "1", content: "If you're the only rescuer, give back blows and abdominal thrusts first. Then call 911 or your local emergency number for help. If another person is there, have that person call for help while you give first aid."},
        {title: "", subtitle: "2", content: "If you're alone and choking, call 911 or your local emergency number right away. Then, give yourself abdominal thrusts, also called the Heimlich maneuver, to remove the stuck object."},


        {title: "Symptoms", subtitle: "1", content: "One or both hands clutched to the throat."},
        {title: "", subtitle: "2", content: "A look of panic, shock or confusion."},
        {title: "", subtitle: "3", content: "Inability to talk."},
        {title: "", subtitle: "4", content: "Strained or noisy breathing."},
        {title: "", subtitle: "5", content: "Squeaky sounds when trying to breathe."},
        {title: "", subtitle: "6", content: "Cough, which may either be weak or forceful."},
        {title: "", subtitle: "7", content: "Skin, lips and nails that change color turning blue or gray."},
        {title: "", subtitle: "8", content: "Loss of consciousness."},



        {title: "Treatment - Infant", subtitle: "1", content: "Sit and hold the infant facedown on your forearm. Rest your forearm on your thigh. Hold the infant's chin and jaw to support the head. Place the head lower than the trunk."},
        {title: "", subtitle: "2", content: "Thump the infant gently but firmly five times on the middle of the back. Use the heel of your hand. Point your fingers up so that you don't hit the back of the infant's head. Gravity and the back thumps should release the blockage."},
        {title: "", subtitle: "3", content: "Turn the infant faceup on your forearm if breathing hasn't started. Rest your arm on your thigh. Place the infant's head lower than the trunk."},
        {title: "", subtitle: "4", content: "Give five gentle but firm chest compressions with your fingers. Place two fingers just below the nipple line. Press down about 1 1/2 inches. Let the chest rise between each compression."},
        {title: "", subtitle: "5", content: "Repeat the back thumps and chest compressions if breathing doesn't start. Call for emergency medical help."},
        {title: "", subtitle: "6", content: "Begin infant CPR if the airway is clear but the infant doesn't start breathing."},
    
        
        
        {title: "Treatment - Child and Adult", subtitle: "1", content: "Stand behind the person and put your arms around their belly (abdomen)."},
        {title: "", subtitle: "2", content: "Make a fist with one hand and clasp your other hand tightly around it."},
        {title: "", subtitle: "3", content: "Place the thumb side of your fist just below their ribcage and about two inches above their belly button (navel)."},
        {title: "", subtitle: "4", content: "Sharply and quickly thrust your hands inward and upward five times."},
        {title: "", subtitle: "5", content: "Repeat this process until you free (dislodge) the object stuck in their windpipe, or the person becomes unconscious. If the person becomes unconscious, start CPR."},
    
        {title: "Treatment - Yourself", subtitle: "1", content: "Place a fist slightly above your navel."},
        {title: "", subtitle: "2", content: "Grasp your fist with the other hand."},
        {title: "", subtitle: "3", content: "Bend over a hard surface. A countertop or chair will do."},
        {title: "", subtitle: "4", content: "Shove your fist inward and upward."},
    ]
    },
]


export const authoritiesOption = [
    {title: "PNP", iconName: "alert", iconFrom: AntDesign},
    {title: "BFP", iconName: "fire", iconFrom: AntDesign},
    {title: "BARANGAY", iconName: "user-shield", iconFrom: FontAwesome5},
    {title: "HOSPITAL", iconName: "hospital", iconFrom: FontAwesome6},
]