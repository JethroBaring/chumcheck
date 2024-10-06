import { getContext, setContext } from "svelte";

export const useAuthStore = () => {
	const applicants = $state(applicantsData);
	let showApplicantCapsuleProposal = $state(false);
	let showPendingDialog = $state(false);

	const toggleShowPendingDialog = () => {
		showPendingDialog = !showPendingDialog;
	};

	const toggleShowApplicantCapsuleProposal = () => {
		showApplicantCapsuleProposal = !showApplicantCapsuleProposal;
	};

  const getApplicantInformation = async (startupId: number) => {
    console.log(startupId)
  }

  const updateApplicantScore = async (id: number, newScore: number) => {
    console.log(id);
    console.log(newScore)
  }

  const saveApplicantRating = async (startupId: number) => {
    console.log(startupId)
  }

  return {
    get applicants() {
      return applicants;
    },
    get showApplicantCapsuleProposal() {
      return showApplicantCapsuleProposal;
    },
    get showPendingDialog() {
      return showPendingDialog;
    },
    toggleShowPendingDialog,
    toggleShowApplicantCapsuleProposal,
    getApplicantInformation,
    updateApplicantScore,
    saveApplicantRating
  }
};

const RATED_KEY = Symbol('rated');

export function setManagerRatedStoreState(applicantsData: unknown[]) {
  return setContext(RATED_KEY, useManagerRatedStore(applicantsData))
}

export function getManagerRatedStoreState() {
  return getContext(RATED_KEY)
}