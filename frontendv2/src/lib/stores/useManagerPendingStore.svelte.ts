import { getContext, setContext } from "svelte";

export const useManagerPendingStore = (applicantsData: unknown[]) => {
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

const PENDING_KEY = Symbol('pending');

export function setManagerPendingStoreState(applicantsData: unknown[]) {
  return setContext(PENDING_KEY, useManagerPendingStore(applicantsData))
}

export function getManagerPendingStoreState() {
  return getContext(PENDING_KEY)
}