import { mapState, mapGetters } from 'vuex';
import CoreBase from 'kolibri.coreVue.components.CoreBase';
import CoreTable from 'kolibri.coreVue.components.CoreTable';
import KModal from 'kolibri.coreVue.components.KModal';
import KButton from 'kolibri.coreVue.components.KButton';
import KCheckbox from 'kolibri.coreVue.components.KCheckbox';
import KDropdownMenu from 'kolibri.coreVue.components.KDropdownMenu';
import KGrid from 'kolibri.coreVue.components.KGrid';
import KGridItem from 'kolibri.coreVue.components.KGridItem';
import KRouterLink from 'kolibri.coreVue.components.KRouterLink';
import { ContentNodeKinds, CollectionKinds } from 'kolibri.coreVue.vuex.constants';
import KSelect from 'kolibri.coreVue.components.KSelect';
import router from 'kolibri.coreVue.router';
import ContentIcon from 'kolibri.coreVue.components.ContentIcon';
import meanBy from 'lodash/meanBy';
import maxBy from 'lodash/maxBy';
import map from 'lodash/map';
import ElapsedTime from 'kolibri.coreVue.components.ElapsedTime';
import KPageContainer from 'kolibri.coreVue.components.KPageContainer';
import filter from 'lodash/filter';
import sortBy from 'lodash/sortBy';
import { PageNames } from '../constants';
import { STATUSES } from '../modules/classSummary/constants';
import TopNavbar from './TopNavbar';
import { coachStrings, coachStringsMixin } from './common/commonCoachStrings';
import Answer from './common/Answer';
import BackLink from './common/BackLink';
import TruncatedItemList from './common/TruncatedItemList';
import LessonActive from './common/LessonActive';
import MasteryModel from './common/MasteryModel';
import Recipients from './common/Recipients';
import Score from './common/Score';
import TimeDuration from './common/TimeDuration';
import QuizActive from './common/QuizActive';
import HeaderTable from './common/HeaderTable';
import HeaderTableRow from './common/HeaderTable/HeaderTableRow';
import HeaderTabs from './common/HeaderTabs';
import HeaderTab from './common/HeaderTabs/HeaderTab';
import StatusSummary from './common/status/StatusSummary';
import StatusSimple from './common/status/StatusSimple';
import HelpNeeded from './common/status/HelpNeeded';
import ItemStatusRatio from './common/status/ItemStatusRatio';
import ItemStatusCount from './common/status/ItemStatusCount';
import ItemStatusLabel from './common/status/ItemStatusLabel';
import Placeholder from './common/Placeholder';
import { VERBS, ICONS } from './common/status/constants';

function formatPageTitle() {
  // To get a page title, each coach route should have
  // meta.titleParts defined, which is an array of coachStrings tr keys
  // or special all-caps strings that get mapped to names.
  const parts = this.$route.meta.titleParts || [];
  const classSummary = this.$store.state.classSummary;
  const { params } = this.$route;

  let strings = parts.map(part => {
    switch (part) {
      case 'GROUP_NAME':
        return classSummary.groupMap[params.groupId].name;
      case 'CLASS_NAME':
        return classSummary.name;
      case 'LEARNER_NAME':
        return classSummary.learnerMap[params.learnerId].name;
      case 'LESSON_NAME':
        return classSummary.lessonMap[params.lessonId].title;
      case 'QUIZ_NAME':
        return classSummary.examMap[params.quizId].title;
      case 'EXERCISE_NAME':
        return classSummary.contentMap[params.exerciseId].title;
      case 'RESOURCE_NAME':
        return classSummary.contentMap[params.resourceId].title;
      default:
        return coachStrings.$tr(part);
    }
  });

  if (this.isRtl) {
    strings = strings.reverse();
  }
  return strings.join(' - ');
}

const CoachCoreBase = {
  extends: CoreBase,
  props: {
    // Gives each Coach page a default title of 'Coach – [Class Name]'
    appBarTitle: {
      type: String,
      default() {
        const coachLabel = coachStrings.$tr('coachLabel');
        const classroomName = this.$store.state.classSummary.name;
        if (!classroomName) {
          return coachLabel;
        }
        if (this.isRtl) {
          return `${classroomName} – ${coachLabel}`;
        }
        return `${coachLabel} – ${classroomName}`;
      },
    },
    pageTitle: {
      type: String,
      default() {
        return formatPageTitle.call(this);
      },
    },
  },
};

export default {
  name: 'ReportsQuizHeader',
  components: {
    CoreBase: CoachCoreBase,
    CoreTable,
    ContentIcon,
    TopNavbar,
    KModal,
    KButton,
    KCheckbox,
    KDropdownMenu,
    KGrid,
    KGridItem,
    KRouterLink,
    KSelect,
    Answer,
    BackLink,
    TruncatedItemList,
    LessonActive,
    MasteryModel,
    Recipients,
    Score,
    TimeDuration,
    QuizActive,
    HeaderTable,
    ElapsedTime,
    KPageContainer,
    HeaderTableRow,
    HeaderTabs,
    HeaderTab,
    StatusSummary,
    StatusSimple,
    HelpNeeded,
    ItemStatusRatio,
    ItemStatusCount,
    ItemStatusLabel,
    Placeholder,
  },
  mixins: [coachStringsMixin],
  computed: {
    ...mapGetters(['isAdmin', 'isCoach', 'isSuperuser']),
    ...mapState('classSummary', { classId: 'id', className: 'name' }),
    ...mapState('classSummary', [
      'coachMap',
      'learnerMap',
      'groupMap',
      'examMap',
      'examLearnerStatusMap',
      'contentMap',
      'contentNodeMap',
      'contentLearnerStatusMap',
      'lessonMap',
    ]),
    ...mapGetters('classSummary', [
      'coaches',
      'learners',
      'groups',
      'exams',
      'examStatuses',
      'content',
      'contentStatuses',
      'lessons',
      'lessonStatuses',
      'lessonLearnerStatusMap',
      'notificationModuleData',
      'getGroupNames',
      'getGroupNamesForLearner',
      'getLearnersForGroups',
      'getContentStatusObjForLearner',
      'getContentStatusTally',
      'getExamStatusObjForLearner',
      'getExamStatusTally',
      'getLessonStatusStringForLearner',
      'getLessonStatusTally',
      'getContentAvgTimeSpent',
      'getExamAvgScore',
    ]),
    userIsAuthorized() {
      return this.isCoach || this.isAdmin || this.isSuperuser;
    },
    PageNames() {
      return PageNames;
    },
    ContentNodeKinds() {
      return ContentNodeKinds;
    },
    CollectionKinds() {
      return CollectionKinds;
    },
    VERBS() {
      return VERBS;
    },
    ICONS() {
      return ICONS;
    },
    STATUSES() {
      return STATUSES;
    },
    _() {
      return {
        maxBy,
        meanBy,
        sortBy,
        map,
        filter,
      };
    },
  },
  methods: {
    classRoute(name, params = {}) {
      if (this.classId) {
        params.classId = this.classId;
      }
      return router.getRoute(name, params);
    },
  },
};
