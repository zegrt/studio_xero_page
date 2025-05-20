document.addEventListener('DOMContentLoaded', () => {
    const imageContainers = document.querySelectorAll('.image-container');
    const maxOffset = 20; // Max pixels the image will move

    // Function to calculate and apply transform
    function handleMouseMove(e) {
        imageContainers.forEach(container => {
            const rect = container.getBoundingClientRect();
            const containerCenterX = rect.left + rect.width / 2;
            const containerCenterY = rect.top + rect.height / 2;

            // Mouse position relative to the viewport
            const mouseX = e.clientX;
            const mouseY = e.clientY;

            // Vector from container center to mouse
            let deltaX = mouseX - containerCenterX;
            let deltaY = mouseY - containerCenterY;

            // Distance from mouse to container center
            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

            // Normalize the vector (make its length 1)
            if (distance > 0) {
                deltaX /= distance;
                deltaY /= distance;
            }

            // Calculate repulsion strength: stronger when closer, up to maxOffset
            // We want it to move away, so we invert the delta direction.
            // The strength of repulsion could be inversely proportional to distance,
            // but capped to avoid extreme movement or jitters.
            // Let's try a simpler approach: move by a fixed amount in the opposite direction
            // when the mouse is within a certain radius, or scale it.

            // For a simple "move away a bit when mouse is close" effect:
            // Calculate the repulsion offset based on distance, capped by maxOffset.
            // The closer the mouse, the larger the (negative) offset.
            const proximityFactor = Math.max(0, 1 - distance / 200); // Adjust 200 to change sensitivity radius
            
            const offsetX = -deltaX * maxOffset * proximityFactor;
            const offsetY = -deltaY * maxOffset * proximityFactor;

            container.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
        });
    }

    // Function to reset transform when mouse leaves the general area
    function resetTransforms() {
        imageContainers.forEach(container => {
            container.style.transform = 'translate(0px, 0px)';
        });
    }

    // Add mousemove listener to the whole document or a relevant wrapper
    document.addEventListener('mousemove', handleMouseMove);
    
    // Optional: Reset when mouse leaves the window (good for testing)
    document.addEventListener('mouseleave', resetTransforms);

    // You might want to reset if the mouse leaves the .content-wrapper specifically
    // const contentWrapper = document.querySelector('.content-wrapper');
    // if (contentWrapper) {
    //     contentWrapper.addEventListener('mouseleave', resetTransforms);
    // }
});
