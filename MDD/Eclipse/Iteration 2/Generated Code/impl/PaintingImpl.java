/**
 */
package com.garagu.emf.fillthevoid.model.FillTheVoid.impl;

import com.garagu.emf.fillthevoid.model.FillTheVoid.FillTheVoidPackage;
import com.garagu.emf.fillthevoid.model.FillTheVoid.Painting;

import java.util.Collection;

import org.eclipse.emf.common.notify.Notification;

import org.eclipse.emf.common.util.EList;

import org.eclipse.emf.ecore.EClass;

import org.eclipse.emf.ecore.impl.ENotificationImpl;
import org.eclipse.emf.ecore.impl.MinimalEObjectImpl;

import org.eclipse.emf.ecore.util.EDataTypeUniqueEList;

/**
 * <!-- begin-user-doc -->
 * An implementation of the model object '<em><b>Painting</b></em>'.
 * <!-- end-user-doc -->
 * <p>
 * The following features are implemented:
 * </p>
 * <ul>
 *   <li>{@link com.garagu.emf.fillthevoid.model.FillTheVoid.impl.PaintingImpl#getId <em>Id</em>}</li>
 *   <li>{@link com.garagu.emf.fillthevoid.model.FillTheVoid.impl.PaintingImpl#getImageName <em>Image Name</em>}</li>
 *   <li>{@link com.garagu.emf.fillthevoid.model.FillTheVoid.impl.PaintingImpl#getDescription <em>Description</em>}</li>
 *   <li>{@link com.garagu.emf.fillthevoid.model.FillTheVoid.impl.PaintingImpl#getAuthor <em>Author</em>}</li>
 *   <li>{@link com.garagu.emf.fillthevoid.model.FillTheVoid.impl.PaintingImpl#getNoVisualizations <em>No Visualizations</em>}</li>
 *   <li>{@link com.garagu.emf.fillthevoid.model.FillTheVoid.impl.PaintingImpl#getComments <em>Comments</em>}</li>
 *   <li>{@link com.garagu.emf.fillthevoid.model.FillTheVoid.impl.PaintingImpl#getImage <em>Image</em>}</li>
 * </ul>
 *
 * @generated
 */
public class PaintingImpl extends MinimalEObjectImpl.Container implements Painting {
	/**
	 * The default value of the '{@link #getId() <em>Id</em>}' attribute.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @see #getId()
	 * @generated
	 * @ordered
	 */
	protected static final String ID_EDEFAULT = null;

	/**
	 * The cached value of the '{@link #getId() <em>Id</em>}' attribute.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @see #getId()
	 * @generated
	 * @ordered
	 */
	protected String id = ID_EDEFAULT;

	/**
	 * The default value of the '{@link #getImageName() <em>Image Name</em>}' attribute.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @see #getImageName()
	 * @generated
	 * @ordered
	 */
	protected static final String IMAGE_NAME_EDEFAULT = null;

	/**
	 * The cached value of the '{@link #getImageName() <em>Image Name</em>}' attribute.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @see #getImageName()
	 * @generated
	 * @ordered
	 */
	protected String imageName = IMAGE_NAME_EDEFAULT;

	/**
	 * The default value of the '{@link #getDescription() <em>Description</em>}' attribute.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @see #getDescription()
	 * @generated
	 * @ordered
	 */
	protected static final String DESCRIPTION_EDEFAULT = null;

	/**
	 * The cached value of the '{@link #getDescription() <em>Description</em>}' attribute.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @see #getDescription()
	 * @generated
	 * @ordered
	 */
	protected String description = DESCRIPTION_EDEFAULT;

	/**
	 * The default value of the '{@link #getAuthor() <em>Author</em>}' attribute.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @see #getAuthor()
	 * @generated
	 * @ordered
	 */
	protected static final String AUTHOR_EDEFAULT = null;

	/**
	 * The cached value of the '{@link #getAuthor() <em>Author</em>}' attribute.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @see #getAuthor()
	 * @generated
	 * @ordered
	 */
	protected String author = AUTHOR_EDEFAULT;

	/**
	 * The default value of the '{@link #getNoVisualizations() <em>No Visualizations</em>}' attribute.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @see #getNoVisualizations()
	 * @generated
	 * @ordered
	 */
	protected static final int NO_VISUALIZATIONS_EDEFAULT = 0;

	/**
	 * The cached value of the '{@link #getNoVisualizations() <em>No Visualizations</em>}' attribute.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @see #getNoVisualizations()
	 * @generated
	 * @ordered
	 */
	protected int noVisualizations = NO_VISUALIZATIONS_EDEFAULT;

	/**
	 * The cached value of the '{@link #getComments() <em>Comments</em>}' attribute list.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @see #getComments()
	 * @generated
	 * @ordered
	 */
	protected EList<String> comments;

	/**
	 * The default value of the '{@link #getImage() <em>Image</em>}' attribute.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @see #getImage()
	 * @generated
	 * @ordered
	 */
	protected static final byte[] IMAGE_EDEFAULT = null;

	/**
	 * The cached value of the '{@link #getImage() <em>Image</em>}' attribute.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @see #getImage()
	 * @generated
	 * @ordered
	 */
	protected byte[] image = IMAGE_EDEFAULT;

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	protected PaintingImpl() {
		super();
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	protected EClass eStaticClass() {
		return FillTheVoidPackage.Literals.PAINTING;
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	public String getId() {
		return id;
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	public void setId(String newId) {
		String oldId = id;
		id = newId;
		if (eNotificationRequired())
			eNotify(new ENotificationImpl(this, Notification.SET, FillTheVoidPackage.PAINTING__ID, oldId, id));
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	public String getImageName() {
		return imageName;
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	public void setImageName(String newImageName) {
		String oldImageName = imageName;
		imageName = newImageName;
		if (eNotificationRequired())
			eNotify(new ENotificationImpl(this, Notification.SET, FillTheVoidPackage.PAINTING__IMAGE_NAME, oldImageName,
					imageName));
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	public String getDescription() {
		return description;
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	public void setDescription(String newDescription) {
		String oldDescription = description;
		description = newDescription;
		if (eNotificationRequired())
			eNotify(new ENotificationImpl(this, Notification.SET, FillTheVoidPackage.PAINTING__DESCRIPTION,
					oldDescription, description));
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	public String getAuthor() {
		return author;
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	public void setAuthor(String newAuthor) {
		String oldAuthor = author;
		author = newAuthor;
		if (eNotificationRequired())
			eNotify(new ENotificationImpl(this, Notification.SET, FillTheVoidPackage.PAINTING__AUTHOR, oldAuthor,
					author));
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	public int getNoVisualizations() {
		return noVisualizations;
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	public void setNoVisualizations(int newNoVisualizations) {
		int oldNoVisualizations = noVisualizations;
		noVisualizations = newNoVisualizations;
		if (eNotificationRequired())
			eNotify(new ENotificationImpl(this, Notification.SET, FillTheVoidPackage.PAINTING__NO_VISUALIZATIONS,
					oldNoVisualizations, noVisualizations));
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	public EList<String> getComments() {
		if (comments == null) {
			comments = new EDataTypeUniqueEList<String>(String.class, this, FillTheVoidPackage.PAINTING__COMMENTS);
		}
		return comments;
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	public byte[] getImage() {
		return image;
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	public void setImage(byte[] newImage) {
		byte[] oldImage = image;
		image = newImage;
		if (eNotificationRequired())
			eNotify(new ENotificationImpl(this, Notification.SET, FillTheVoidPackage.PAINTING__IMAGE, oldImage, image));
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public Object eGet(int featureID, boolean resolve, boolean coreType) {
		switch (featureID) {
		case FillTheVoidPackage.PAINTING__ID:
			return getId();
		case FillTheVoidPackage.PAINTING__IMAGE_NAME:
			return getImageName();
		case FillTheVoidPackage.PAINTING__DESCRIPTION:
			return getDescription();
		case FillTheVoidPackage.PAINTING__AUTHOR:
			return getAuthor();
		case FillTheVoidPackage.PAINTING__NO_VISUALIZATIONS:
			return getNoVisualizations();
		case FillTheVoidPackage.PAINTING__COMMENTS:
			return getComments();
		case FillTheVoidPackage.PAINTING__IMAGE:
			return getImage();
		}
		return super.eGet(featureID, resolve, coreType);
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	@SuppressWarnings("unchecked")
	@Override
	public void eSet(int featureID, Object newValue) {
		switch (featureID) {
		case FillTheVoidPackage.PAINTING__ID:
			setId((String) newValue);
			return;
		case FillTheVoidPackage.PAINTING__IMAGE_NAME:
			setImageName((String) newValue);
			return;
		case FillTheVoidPackage.PAINTING__DESCRIPTION:
			setDescription((String) newValue);
			return;
		case FillTheVoidPackage.PAINTING__AUTHOR:
			setAuthor((String) newValue);
			return;
		case FillTheVoidPackage.PAINTING__NO_VISUALIZATIONS:
			setNoVisualizations((Integer) newValue);
			return;
		case FillTheVoidPackage.PAINTING__COMMENTS:
			getComments().clear();
			getComments().addAll((Collection<? extends String>) newValue);
			return;
		case FillTheVoidPackage.PAINTING__IMAGE:
			setImage((byte[]) newValue);
			return;
		}
		super.eSet(featureID, newValue);
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public void eUnset(int featureID) {
		switch (featureID) {
		case FillTheVoidPackage.PAINTING__ID:
			setId(ID_EDEFAULT);
			return;
		case FillTheVoidPackage.PAINTING__IMAGE_NAME:
			setImageName(IMAGE_NAME_EDEFAULT);
			return;
		case FillTheVoidPackage.PAINTING__DESCRIPTION:
			setDescription(DESCRIPTION_EDEFAULT);
			return;
		case FillTheVoidPackage.PAINTING__AUTHOR:
			setAuthor(AUTHOR_EDEFAULT);
			return;
		case FillTheVoidPackage.PAINTING__NO_VISUALIZATIONS:
			setNoVisualizations(NO_VISUALIZATIONS_EDEFAULT);
			return;
		case FillTheVoidPackage.PAINTING__COMMENTS:
			getComments().clear();
			return;
		case FillTheVoidPackage.PAINTING__IMAGE:
			setImage(IMAGE_EDEFAULT);
			return;
		}
		super.eUnset(featureID);
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public boolean eIsSet(int featureID) {
		switch (featureID) {
		case FillTheVoidPackage.PAINTING__ID:
			return ID_EDEFAULT == null ? id != null : !ID_EDEFAULT.equals(id);
		case FillTheVoidPackage.PAINTING__IMAGE_NAME:
			return IMAGE_NAME_EDEFAULT == null ? imageName != null : !IMAGE_NAME_EDEFAULT.equals(imageName);
		case FillTheVoidPackage.PAINTING__DESCRIPTION:
			return DESCRIPTION_EDEFAULT == null ? description != null : !DESCRIPTION_EDEFAULT.equals(description);
		case FillTheVoidPackage.PAINTING__AUTHOR:
			return AUTHOR_EDEFAULT == null ? author != null : !AUTHOR_EDEFAULT.equals(author);
		case FillTheVoidPackage.PAINTING__NO_VISUALIZATIONS:
			return noVisualizations != NO_VISUALIZATIONS_EDEFAULT;
		case FillTheVoidPackage.PAINTING__COMMENTS:
			return comments != null && !comments.isEmpty();
		case FillTheVoidPackage.PAINTING__IMAGE:
			return IMAGE_EDEFAULT == null ? image != null : !IMAGE_EDEFAULT.equals(image);
		}
		return super.eIsSet(featureID);
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public String toString() {
		if (eIsProxy())
			return super.toString();

		StringBuilder result = new StringBuilder(super.toString());
		result.append(" (id: ");
		result.append(id);
		result.append(", imageName: ");
		result.append(imageName);
		result.append(", description: ");
		result.append(description);
		result.append(", author: ");
		result.append(author);
		result.append(", noVisualizations: ");
		result.append(noVisualizations);
		result.append(", comments: ");
		result.append(comments);
		result.append(", image: ");
		result.append(image);
		result.append(')');
		return result.toString();
	}

} //PaintingImpl
