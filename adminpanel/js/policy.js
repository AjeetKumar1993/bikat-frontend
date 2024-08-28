document.getElementById('policyForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const tourSlug = document.getElementById('product-slug-policy-container');
    const tourId = tourSlug.options[tourSlug.selectedIndex].value;

    const data = {
        tourId : tourId
    }

    const confirmationPolicy = document.getElementById('product-confirmationPolicy');
    
    const confirmationPolicyList = Array.from(confirmationPolicy.selectedOptions).map(option => option.value);

    const refundPolicy = document.getElementById('product-refundPolicy');
    
    const refundPolicyList = Array.from(refundPolicy.selectedOptions).map(option => option.value);

    const cancellationPolicy = document.getElementById('product-cancellationPolicy');
    
    const cancellationPolicyList = Array.from(cancellationPolicy.selectedOptions).map(option => option.value);

    const paymentPolicy = document.getElementById('product-paymentPolicy');
    
    const paymentPolicyList = Array.from(paymentPolicy.selectedOptions).map(option => option.value);

    data.confirmationPolicy = confirmationPolicyList;
    data.refundPolicy = refundPolicyList;
    data.cancellationPolicy = cancellationPolicyList;
    data.paymentPolicy = paymentPolicyList;

    await fetch('https://optimum-nebula-433205-b3.uc.r.appspot.com/api/tour/policy', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        console.log('Success:', result);
        alert('Form updated successfully!');
    })
    .catch(error => {
		console.log('Error:'+ error);
        console.error('Error:', error);
        console.log('Error submitting form!');
    });
});