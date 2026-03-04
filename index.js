const projectSections = Array.from(document.querySelectorAll(".project"));
const navButtons = Array.from(document.querySelectorAll(".nav-btn"));

const renderImages = (section) => {
	const gallery = section.querySelector(".gallery");
	const folder = section.dataset.folder;
	const count = Number(section.dataset.count || 0);
	const ext = section.dataset.ext || "png";

	if (!gallery || gallery.childElementCount > 0 || !folder || !count) {
		return;
	}

	const fragment = document.createDocumentFragment();
	for (let i = 1; i <= count; i += 1) {
		const img = document.createElement("img");
		img.src = `${folder}/${i}.${ext}`;
		img.alt = `${section.id}-${i}`;
		fragment.appendChild(img);
	}
	gallery.appendChild(fragment);
};

const setActiveProject = (targetId) => {
	projectSections.forEach((section) => {
		const isActive = section.id === targetId;
		section.classList.toggle("active", isActive);
		if (isActive) {
			renderImages(section);
		}
	});

	navButtons.forEach((button) => {
		const isActive = button.dataset.target === targetId;
		button.classList.toggle("active", isActive);
	});
};

navButtons.forEach((button) => {
	button.addEventListener("click", (event) => {
		event.preventDefault();
		const targetId = button.dataset.target;
		if (!targetId) {
			return;
		}
		setActiveProject(targetId);
		const section = document.getElementById(targetId);
		if (section) {
			section.scrollIntoView({ behavior: "smooth", block: "start" });
		}
		history.replaceState(null, "", `#${targetId}`);
	});
});

const initialTarget = window.location.hash.replace("#", "") || "pro1";
setActiveProject(initialTarget);
